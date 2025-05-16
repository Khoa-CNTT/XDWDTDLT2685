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
import java.util.logging.Logger;

@Service
public class IOAuth2UserService extends DefaultOAuth2UserService {

    private static final Logger LOGGER = Logger.getLogger(IOAuth2UserService.class.getName());

    private final UserRepository userRepository;
    private final SocialAccountRepository socialAccountRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenUtil jwtTokenUtil;

    public IOAuth2UserService(UserRepository userRepository, SocialAccountRepository socialAccountRepository,
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

        LOGGER.info("Processing OAuth2 login: provider=" + provider + ", providerId=" + providerId + ", email=" + email);

        if (email == null || email.isEmpty()) {
            throw new RuntimeException("Email không được cung cấp bởi " + provider);
        }

        // Tìm hoặc tạo người dùng
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .email(email)
                            .fullName(name)
                            .userName(email.split("@")[0])
                            .password("") // Mật khẩu rỗng cho OAuth2
                            .isActive(true)
                            .role(roleRepository.findByName("user") // Sử dụng "user" khớp với DB
                                    .orElseGet(() -> {
                                        LOGGER.warning("Role 'user' không tìm thấy, tạo mới role mặc định.");
                                        return roleRepository.save(Role.builder().name("user").build());
                                    }))
                            .build();

                    LOGGER.info("Creating new user: " + newUser.getEmail());
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
            LOGGER.info("Updating existing SocialAccount: " + socialAccount.getProviderId());
        } else {
            socialAccount = SocialAccount.builder()
                    .provider(provider)
                    .providerId(providerId)
                    .email(email)
                    .name(name)
                    .user(user)
                    .build();
            LOGGER.info("Creating new SocialAccount: provider=" + provider + ", providerId=" + providerId);
        }
        socialAccountRepository.save(socialAccount);

        // Tạo JWT token
        String jwtToken;
        try {
            jwtToken = jwtTokenUtil.generateToken(user);
            LOGGER.info("Generated JWT token for user: " + user.getUsername());
        } catch (InvalidParamException e) {
            LOGGER.severe("Failed to generate JWT token: " + e.getMessage());
            throw new RuntimeException("Không thể tạo JWT token", e);
        }

        // Tạo CustomOAuth2User
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().getName().toUpperCase())
        );
        return new CustomOAuth2User(user.getUsername(), authorities, jwtToken, user.getEmail());
    }
}