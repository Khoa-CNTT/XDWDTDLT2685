package com.project.booktour.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;

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

    @JsonProperty("full_name")
    private String fullName;

    private String comment;

    private Float rating;

    public static ReviewResponse fromReview(com.project.booktour.models.Review review) {
        ReviewResponse reviewResponse = ReviewResponse.builder()
                .reviewId(review.getReviewId())
                .tourId(review.getTour().getTourId())
                .userId(review.getUser().getUserId())
                .avatar(review.getUser().getAvatar() != null ?
                        "http://localhost:8088/api/v1/users/images/" + review.getUser().getAvatar() :
                        "http://localhost:8088/api/v1/users/images/default.jpeg")
                .fullName(review.getUser().getFullName() != null ?
                        review.getUser().getFullName() :
                        "Người dùng không xác định")
                .comment(review.getComment())
                .rating(review.getRating())
                .build();
        reviewResponse.setCreatedAt(review.getCreatedAt());
        reviewResponse.setUpdatedAt(review.getUpdatedAt());
        return reviewResponse;
    }
}