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
public class ReviewResponse {
    @JsonProperty("review_id")
    private Long reviewId;

    @JsonProperty("tour_id")
    private Long tourId;

    @JsonProperty("user_id")
    private Long userId;

    private String comment;

    private Float rating;

    @JsonProperty("create_date")
    private LocalDateTime createDate;

    public static ReviewResponse fromReview(com.project.booktour.models.Review review) {
        return ReviewResponse.builder()
                .reviewId(review.getReviewId())
                .tourId(review.getTour().getTourId())
                .userId(review.getUser().getUserId())
                .comment(review.getComment())
                .rating(review.getRating())
                .createDate(review.getCreateDate())
                .build();
    }
}