package com.project.booktour.services.user;

import com.project.booktour.components.JwtTokenUtil;
import com.project.booktour.dtos.UserDTO;
import com.project.booktour.exceptions.PermissionDenyException;
import com.project.booktour.models.Role;
import com.project.booktour.models.User;
import com.project.booktour.repositories.RoleRepository;
import com.project.booktour.repositories.UserRepository;
import com.project.booktour.services.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import com.project.booktour.exceptions.DataNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;

    @Override
    public User createUser(UserDTO userDTO) throws Exception {
        // Đăng ký tài khoản
        String userName = userDTO.getUserName();
        // Kiểm tra xem userName đã tồn tại hay chưa
        if (userRepository.existsByUserName(userName)) {
            throw new DataIntegrityViolationException("Username already exists");
        }
        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("Role not found"));
        if (role.getName().toUpperCase().equals("ADMIN")) {
            throw new PermissionDenyException("You cannot register an admin account");
        }
        // Convert from userDTO -> user
        User newUser = User.builder()
                .userName(userDTO.getUserName())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .facebookAccountId(userDTO.getFacebookAccountId() != null ? userDTO.getFacebookAccountId() : 0)
                .googleAccountId(userDTO.getGoogleAccountId() != null ? userDTO.getGoogleAccountId() : 0)
                .role(role)
                .build();

        // Mã hóa mật khẩu nếu không dùng tài khoản Facebook/Google
        if (newUser.getFacebookAccountId() == 0 && newUser.getGoogleAccountId() == 0) {
            String password = userDTO.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            newUser.setPassword(encodedPassword);
        }
        return userRepository.save(newUser);
    }

    @Override
    public String login(String userName, String password) throws Exception {
        Optional<User> userOptional = userRepository.findByUserName(userName);
        if (userOptional.isEmpty()) {
            throw new DataNotFoundException("Invalid username / password");
        }
        User existingUser = userOptional.get();

        // Kiểm tra mật khẩu nếu không dùng tài khoản Facebook/Google
        if (existingUser.getFacebookAccountId() == 0 && existingUser.getGoogleAccountId() == 0) {
            if (!passwordEncoder.matches(password, existingUser.getPassword())) {
                throw new BadCredentialsException("Wrong username or password");
            }
        }

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userName, password, existingUser.getAuthorities());
        authenticationManager.authenticate(authenticationToken);
        return jwtTokenUtil.generateToken(existingUser);
    }
}