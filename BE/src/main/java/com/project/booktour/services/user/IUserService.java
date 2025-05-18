package com.project.booktour.services.user;

import com.project.booktour.responses.usersresponse.LoginResponse;
import com.project.booktour.dtos.UpdateUserDTO;
import com.project.booktour.dtos.UserDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.User;
import com.project.booktour.responses.usersresponse.UserProfileResponse;
import jakarta.mail.MessagingException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;

    LoginResponse login(String userName, String password) throws Exception;

    User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception;

    User updateAvatar(Long userId, MultipartFile avatar) throws Exception;
    UserProfileResponse getUserProfile(Long userId) throws Exception;
    Page<User> getAllUser(String keyword, Pageable pageable) throws Exception;

    void blockOrEnable(Long userId, Boolean active) throws DataNotFoundException;
    void deleteUser(Long id) throws DataNotFoundException;
    void initiateResetPassword(String email) throws MessagingException, DataNotFoundException, IOException;
    void resetPasswordWithToken(String token, String newPassword) throws DataNotFoundException;

}