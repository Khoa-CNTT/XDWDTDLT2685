package com.project.booktour.services.user;

import com.project.booktour.components.JwtTokenUtil;
import com.project.booktour.responses.usersresponse.LoginResponse;
import com.project.booktour.dtos.UpdateUserDTO;
import com.project.booktour.dtos.UserDTO;
import com.project.booktour.models.Role;
import com.project.booktour.models.Token;
import com.project.booktour.models.User;
import com.project.booktour.repositories.RoleRepository;
import com.project.booktour.repositories.TokenRepository;
import com.project.booktour.repositories.UserRepository;
import com.project.booktour.responses.usersresponse.UserProfileResponse;
import com.project.booktour.services.EmailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.dao.DataIntegrityViolationException;
import com.project.booktour.exceptions.DataNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    private final EmailService emailService;
    private static final String AVATAR_UPLOAD_DIR = "uploads/avatars/";
    private static final String DEFAULT_AVATAR_PATH = "/uploads/avatars/default-avatar.jpg";

    @Override
    public User createUser(UserDTO userDTO) throws Exception {
        // Đăng ký tài khoản
        String userName = userDTO.getUserName();
        String email = userDTO.getEmail();
        // Kiểm tra xem userName đã tồn tại hay chưa
        if (userRepository.existsByUserName(userName)) {
            throw new DataIntegrityViolationException("Username already exists");
        }
        if (userRepository.existsByEmail(email)) {
            throw new DataIntegrityViolationException("Email already exists");
        }
        Role role = roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new DataNotFoundException("Role not found"));
//        if (role.getName().toUpperCase().equals("ADMIN")) {
//            throw new PermissionDenyException("You cannot register an admin account");
//        }
        // Convert from userDTO -> user
        User newUser = User.builder()
                .userName(userDTO.getUserName())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .facebookAccountId(userDTO.getFacebookAccountId() != null ? userDTO.getFacebookAccountId() : 0)
                .googleAccountId(userDTO.getGoogleAccountId() != null ? userDTO.getGoogleAccountId() : 0)
                .role(role)
                .isActive(true)
                .avatar(DEFAULT_AVATAR_PATH)
                .build();
        if (newUser.getFacebookAccountId() == 0 && newUser.getGoogleAccountId() == 0) {
            String password = userDTO.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            newUser.setPassword(encodedPassword);
        }
        return userRepository.save(newUser);
    }

    @Override
    public LoginResponse login(String userName, String password) throws Exception {
        Optional<User> userOptional = userRepository.findByUserName(userName);
        if (userOptional.isEmpty()) {
            throw new DataNotFoundException("Invalid username / password");
        }
        User existingUser = userOptional.get();
        if (existingUser.getFacebookAccountId() == 0 && existingUser.getGoogleAccountId() == 0) {
            if (!passwordEncoder.matches(password, existingUser.getPassword())) {
                throw new BadCredentialsException("Wrong username or password");
            }
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userName, password, existingUser.getAuthorities());
        authenticationManager.authenticate(authenticationToken);
        String token = jwtTokenUtil.generateToken(existingUser);
        Long roleId = existingUser.getRole().getRoleId();
        Long userId = existingUser.getUserId();
        return LoginResponse.builder()
                .token(token)
                .roleId(roleId)
                .userId(userId)
                .build();
    }

    @Override
    @Transactional
    public User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + userId));
        String oldPassword = updatedUserDTO.getOldPassword();
        if (oldPassword != null && !passwordEncoder.matches(oldPassword, existingUser.getPassword())) {
            throw new DataNotFoundException("Incorrect old password");
        }

        if (updatedUserDTO.getPhoneNumber() != null) {
            existingUser.setPhoneNumber(updatedUserDTO.getPhoneNumber());
        }
        if (updatedUserDTO.getAddress() != null) {
            existingUser.setAddress(updatedUserDTO.getAddress());
        }
        if (updatedUserDTO.getDateOfBirth() != null) {
            existingUser.setDateOfBirth(updatedUserDTO.getDateOfBirth());
        }
        if (updatedUserDTO.getFacebookAccountId() != null && updatedUserDTO.getFacebookAccountId() > 0) {
            existingUser.setFacebookAccountId(updatedUserDTO.getFacebookAccountId());
        }
        if (updatedUserDTO.getGoogleAccountId() != null && updatedUserDTO.getGoogleAccountId() > 0) {
            existingUser.setGoogleAccountId(updatedUserDTO.getGoogleAccountId());
        }

        String newPassword = updatedUserDTO.getNewPassword();
        String confirmPassword = updatedUserDTO.getConfirmPassword();
        if (newPassword != null && !newPassword.isEmpty()) {
            if (!newPassword.equals(confirmPassword)) {
                throw new DataNotFoundException("New password and confirm password do not match");
            }
            String encodedPassword = passwordEncoder.encode(newPassword);
            existingUser.setPassword(encodedPassword);
            // Invalidate existing tokens
            List<Token> tokens = tokenRepository.findByUser(existingUser);
            for (Token token : tokens) {
                tokenRepository.delete(token);
            }
        }

        return userRepository.save(existingUser);
    }

    @Transactional
    public User updateAvatar(Long userId, MultipartFile avatar) throws Exception {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + userId));

        if (avatar != null && !avatar.isEmpty()) {
            String fileName = storeFile(avatar);
            if (fileName != null) {
                existingUser.setAvatar("/uploads/avatars/" + fileName);
            }
        }

        return userRepository.save(existingUser);
    }

    private String storeFile(MultipartFile file) throws IOException {
        if (file.getSize() == 0) {
            return null;
        }
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("Avatar size must not exceed 5MB");
        }

        Tika tika = new Tika();
        String mimeType = tika.detect(file.getInputStream());
        if (!mimeType.startsWith("image/")) {
            throw new IllegalArgumentException("File must be an image");
        }

        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        Path uploadDir = Paths.get(AVATAR_UPLOAD_DIR);
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        Path destination = Paths.get(uploadDir.toString(), fileName);
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    @Override
    public Page<User> getAllUser(String keyword, Pageable pageable) {
        return userRepository.findAll(keyword, pageable);
    }

    @Override
    @Transactional
    public void blockOrEnable(Long userId, Boolean active) throws DataNotFoundException {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + userId));
        existingUser.setIsActive(active);
        userRepository.save(existingUser);
    }

    @Override
    public UserProfileResponse getUserProfile(Long userId) throws Exception {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + userId));
        String avatarPath = existingUser.getAvatar();
        if (avatarPath != null && !avatarPath.equals(DEFAULT_AVATAR_PATH)) {
            avatarPath = "http://localhost:8088/api/v1/users/avatars/" + Paths.get(avatarPath).getFileName().toString();
        } else {
            avatarPath = "http://localhost:8088/api/v1/users/avatars/default-avatar.jpg";
        }

        return UserProfileResponse.builder()
                .userName(existingUser.getUsername())
                .phoneNumber(existingUser.getPhoneNumber())
                .email(existingUser.getEmail())
                .avatarPath(avatarPath)
                .address(existingUser.getAddress())
                .dateOfBirth(existingUser.getDateOfBirth())
                .facebookAccountId(existingUser.getFacebookAccountId())
                .googleAccountId(existingUser.getGoogleAccountId())
                .build();
    }
    @Override
    @Transactional
    public void deleteUser(Long id) throws DataNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + id));

        // Xóa tất cả token liên quan trước
        List<Token> tokens = tokenRepository.findByUser(user);
        tokenRepository.deleteAll(tokens);

        userRepository.delete(user);
    }
    @Override
    public void initiateResetPassword(String email) throws DataNotFoundException, IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new DataNotFoundException("Email không tồn tại"));

        String resetToken = UUID.randomUUID().toString();
        LocalDateTime expiration = LocalDateTime.now().plusMinutes(10);

        // Xoá token cũ
        tokenRepository.deleteAllByUser(user);

        // Lưu token mới
        Token tokenEntity = Token.builder()
                .token(resetToken)
                .tokenType("RESET_PASSWORD")
                .expirationDate(expiration)
                .revoked(false)
                .expired(false)
                .user(user)
                .build();
        tokenRepository.save(tokenEntity);

        // Gửi email
        String content = "<h3>Mã xác nhận đặt lại mật khẩu</h3>" +
                "<p>Mã của bạn là: <b>" + resetToken + "</b></p>" +
                "<p>Mã này có hiệu lực trong 10 phút.</p>";

        emailService.sendInvoiceEmail(email, "Yêu cầu đặt lại mật khẩu", content, null);
    }
    @Override
    public void resetPasswordWithToken(String tokenStr, String newPassword) throws DataNotFoundException {
        Token token = tokenRepository.findByToken(tokenStr)
                .orElseThrow(() -> new DataNotFoundException("Token không hợp lệ."));

        if (token.isExpired() || token.isRevoked() || token.getExpirationDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token đã hết hạn hoặc không hợp lệ.");
        }

        User user = token.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Thu hồi token
        token.setRevoked(true);
        token.setExpired(true);
        tokenRepository.save(token);
    }


}