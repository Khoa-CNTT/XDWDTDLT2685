package com.project.booktour.services.user;

import com.project.booktour.components.JwtTokenUtil;
import com.project.booktour.exceptions.InvalidParamException;
import com.project.booktour.models.Role;
import com.project.booktour.models.SocialAccount;
import com.project.booktour.models.User;
import com.project.booktour.models.CustomOAuth2User;
import com.project.booktour.repositories.RoleRepository;
import com.project.booktour.repositories.SocialAccountRepository;
import com.project.booktour.repositories.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class OAuth2UserServiceImpl extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final SocialAccountRepository socialAccountRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public OAuth2UserServiceImpl(UserRepository userRepository, SocialAccountRepository socialAccountRepository,
                                 RoleRepository roleRepository, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.socialAccountRepository = socialAccountRepository;
        this.roleRepository = roleRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerId = oAuth2User.getName();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // Tìm hoặc tạo người dùng
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .email(email)
                            .fullName(name)
                            .userName(email.split("@")[0])
                            .password("")
                            .isActive(true)
                            .role(roleRepository.findByName("user") // Dùng chữ thường để match với DB
                                    .orElseThrow(() -> new RuntimeException("Role user không tìm thấy")))
                            .build();

                    try {
                        // Chỉ chuyển đổi khi providerId có thể chuyển thành số
                        if (provider.equals("google")) {
                            try {
                                newUser.setGoogleAccountId(Integer.parseInt(providerId));
                            } catch (NumberFormatException e) {
                                System.out.println("Google ID không phải là số: " + providerId);
                            }
                        } else if (provider.equals("facebook")) {
                            try {
                                newUser.setFacebookAccountId(Integer.parseInt(providerId));
                            } catch (NumberFormatException e) {
                                System.out.println("Facebook ID không phải là số: " + providerId);
                            }
                        }
                    } catch (Exception e) {
                        System.err.println("Lỗi khi xử lý provider ID: " + e.getMessage());
                    }

                    return userRepository.save(newUser);
                });

        // Kiểm tra và lưu SocialAccount để tránh trùng lặp
        Optional<SocialAccount> existingSocialAccount = socialAccountRepository.findByProviderAndProviderId(provider, providerId);
        SocialAccount socialAccount;
        if (existingSocialAccount.isPresent()) {
            socialAccount = existingSocialAccount.get();
            socialAccount.setEmail(email);
            socialAccount.setName(name);
            socialAccount.setUser(user);
            System.out.println("Cập nhật SocialAccount hiện có: " + socialAccount.getProviderId());
        } else {
            socialAccount = SocialAccount.builder()
                    .provider(provider)
                    .providerId(providerId)
                    .email(email)
                    .name(name)
                    .user(user)
                    .build();
            System.out.println("Tạo mới SocialAccount cho provider: " + provider + ", providerId: " + providerId);
        }
        socialAccountRepository.save(socialAccount);

        // Tạo JWT token
        String jwtToken = null;
        try {
            jwtToken = jwtTokenUtil.generateToken(user);
        } catch (InvalidParamException e) {
            throw new RuntimeException(e);
        }

        // Tạo CustomOAuth2User
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().getName().toUpperCase())
        );
        return new CustomOAuth2User(user.getUsername(), authorities, jwtToken, user.getEmail());
    }
}