package com.project.booktour.responses.reviewsreponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.booktour.responses.BaseResponse;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResponse extends BaseResponse {
    @JsonProperty("review_id")
    private Long reviewId;

    @JsonProperty("tour_id")
    private Long tourId;

    @JsonProperty("user_id")
    private Long userId;

    @JsonProperty("avatar")
    private String avatar;

    @JsonProperty("user_name")
    private String userName;

    private String comment;

    private Float rating;

    private static final String BASE_URL = "http://localhost:8088";
    private static final String DEFAULT_AVATAR = "default-avatar.jpg";

    public static ReviewResponse fromReview(com.project.booktour.models.Review review) {
        String avatarUrl;

        if (review.getUser() != null && review.getUser().getAvatar() != null && !review.getUser().getAvatar().isEmpty()
                && !review.getUser().getAvatar().equals("uploads/avatars/" + DEFAULT_AVATAR)) {
            // Loại bỏ tiền tố uploads/avatars/ khỏi tên file
            String cleanAvatarFileName = review.getUser().getAvatar().replaceAll("^(?:.*?/)?(?:uploads/avatars/)?", "");
            avatarUrl = BASE_URL + "/api/v1/users/avatars/" + cleanAvatarFileName;
        } else {
            avatarUrl = BASE_URL + "/api/v1/users/avatars/" + DEFAULT_AVATAR;
        }

        ReviewResponse reviewResponse = ReviewResponse.builder()
                .reviewId(review.getReviewId())
                .tourId(review.getTour().getTourId())
                .userId(review.getUser() != null ? review.getUser().getUserId() : null)
                .avatar(avatarUrl)
                .userName(review.getUser() != null && review.getUser().getUsername() != null ?
                        review.getUser().getUsername() :
                        "Người dùng không xác định")
                .comment(review.getComment())
                .rating(review.getRating())
                .build();
        reviewResponse.setCreatedAt(review.getCreatedAt());
        reviewResponse.setUpdatedAt(review.getUpdatedAt());
        return reviewResponse;
    }
}