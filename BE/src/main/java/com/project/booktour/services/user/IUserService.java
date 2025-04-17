package com.project.booktour.services.user;

import com.project.booktour.dtos.LoginResponseDTO;
import com.project.booktour.dtos.UpdateUserDTO;
import com.project.booktour.dtos.UserDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.exceptions.InvalidPasswordException;
import com.project.booktour.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;

    LoginResponseDTO login(String userName, String password) throws Exception;

    User updateUser(Long userId, UpdateUserDTO updatedUserDTO) throws Exception;

    User updateAvatar(Long userId, MultipartFile avatar) throws Exception;

    User updatePassword(Long userId, String newPassword, String retypePassword)
            throws DataNotFoundException;
    Page<User> findAll(String keyword, Pageable pageable) throws Exception;

    void blockOrEnable(Long userId, Boolean active) throws DataNotFoundException;
}