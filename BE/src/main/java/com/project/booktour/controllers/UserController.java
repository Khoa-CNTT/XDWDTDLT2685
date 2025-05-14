package com.project.booktour.controllers;

import com.project.booktour.responses.usersresponse.LoginResponse;
import com.project.booktour.dtos.UpdateUserDTO;
import com.project.booktour.dtos.UserDTO;
import com.project.booktour.dtos.UserLoginDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.User;
import com.project.booktour.responses.usersresponse.UserListResponse;
import com.project.booktour.responses.usersresponse.UserProfileResponse;
import com.project.booktour.responses.usersresponse.UserResponse;
import com.project.booktour.services.user.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAllUser(
            @RequestParam(defaultValue = "", required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit
    ) {
        try {
            PageRequest pageRequest = PageRequest.of(
                    page, limit,
                    //Sort.by("createdAt").descending()
                    Sort.by("id").ascending()
            );
            Page<UserResponse> userPage = userService.getAllUser(keyword, pageRequest)
                    .map(UserResponse::fromUser);
            int totalPages = userPage.getTotalPages();
            List<UserResponse> userResponses = userPage.getContent();
            return ResponseEntity.ok(UserListResponse
                    .builder()
                    .users(userResponses)
                    .totalPages(totalPages)
                    .build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or #id == principal.userId")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id) {
        try {
            UserProfileResponse userProfile = userService.getUserProfile(id);
            return ResponseEntity.ok(userProfile);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping("/avatars/{imageName}")
    public ResponseEntity<?> viewImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get("uploads/avatars/" + imageName);
            UrlResource resource = new UrlResource(imagePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(new UrlResource(Paths.get("uploads/avatars/default-avatar.jpg").toUri()));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cannot find avatar: " + e.getMessage());
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody @Valid UserDTO userDTO, BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream().map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            if (!userDTO.getPassword().equals(userDTO.getConfirmPassword())) {
                return ResponseEntity.badRequest().body("Password does not math");
            }
            User user = userService.createUser(userDTO);
            return ResponseEntity.ok("User registered successfully: " + user.getUsername());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserLoginDTO userLoginDTO) {
        try {
            LoginResponse loginResponseDTO = userService.login(userLoginDTO.getUserName(), userLoginDTO.getPassword());
            return ResponseEntity.ok(loginResponseDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO updatedUserDTO) {
        try {
            User updatedUser = userService.updateUser(id, updatedUserDTO);
            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/avatar")
    public ResponseEntity<?> updateAvatar(@PathVariable Long id, @RequestParam("avatar") MultipartFile avatar) {
        try {
            User updatedUser = userService.updateAvatar(id, avatar);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/block/{userId}/{active}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> blockOrEnable(
            @Valid @PathVariable long userId,
            @Valid @PathVariable int active
    ) {
        try {
            userService.blockOrEnable(userId, active > 0);
            String message = active > 0 ? "Successfully enabled the user." : "Successfully blocked the " +
                    "user.";
            return ResponseEntity.ok().body(message);
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body("User not found.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting user: " + e.getMessage());
        }
    }
}
