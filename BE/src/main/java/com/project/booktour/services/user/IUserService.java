package com.project.booktour.services.user;

import com.project.booktour.dtos.UserDTO;
import com.project.booktour.models.User;
import org.springframework.stereotype.Service;

@Service
public interface IUserService {
    User createUser(UserDTO userDTO) throws Exception;

    String login(String userName, String password) throws Exception;
}