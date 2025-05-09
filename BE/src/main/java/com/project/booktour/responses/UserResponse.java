package com.project.booktour.responses;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.booktour.models.Role;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("fullname")
    private String fullName;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("address")
    private String address;

    @JsonProperty("is_active")
    private boolean active;

    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;

    @JsonProperty("facebook_account_id")
    private int facebookAccountId;

    @JsonProperty("google_account_id")
    private int googleAccountId;

    @JsonProperty("role")
    private Role role;
    private String avatar;
    public static UserResponse fromUser(com.project.booktour.models.User user) {
        String avatarFileName = user.getAvatar();
        String baseUrl = "http://localhost:8088/api/v1/users";
        String avatarUrl;

        if (avatarFileName != null && !avatarFileName.isEmpty()) {
            // Loại bỏ dấu / ở đầu nếu có
            if (avatarFileName.startsWith("/")) {
                avatarFileName = avatarFileName.substring(1);
            }
            avatarUrl = baseUrl + "/avatars/" + avatarFileName;
        } else {
            avatarUrl = baseUrl + "/avatars/default-avatar.jpg";
        }

        return UserResponse.builder()
                .id(user.getUserId())
                .fullName(user.getUsername())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .active(user.getIsActive())
                .dateOfBirth(user.getDateOfBirth())
                .facebookAccountId(user.getFacebookAccountId())
                .googleAccountId(user.getGoogleAccountId())
                .role(user.getRole())
                .avatar(avatarUrl)
                .build();
    }

}