package com.project.booktour.responses.usersresponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.booktour.models.Role;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("fullname")
    private String fullname;

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

    @JsonProperty("avatar")
    private String avatar;

    private static final String BASE_URL = "http://localhost:8088";
    private static final String DEFAULT_AVATAR = "default-avatar.jpg";

    public static UserResponse fromUser(com.project.booktour.models.User user) {
        String avatarFileName = user.getAvatar();
        String avatarUrl;

        if (avatarFileName != null && !avatarFileName.isEmpty() && !avatarFileName.equals("uploads/avatars/" + DEFAULT_AVATAR)) {
            // Chỉ lấy tên file từ avatarFileName
            String cleanAvatarFileName = avatarFileName.replaceAll("^(?:.*?/)?(?:uploads/avatars/)?", "");
            avatarUrl = BASE_URL + "/api/v1/users/avatars/" + cleanAvatarFileName;
        } else {
            avatarUrl = BASE_URL + "/api/v1/users/avatars/" + DEFAULT_AVATAR;
        }

        return UserResponse.builder()
                .id(user.getUserId())
                .fullname(user.getUsername())
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
