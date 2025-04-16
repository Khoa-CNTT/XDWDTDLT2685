package com.project.booktour.controllers;

import com.project.booktour.dtos.ReviewDTO;
import com.project.booktour.exceptions.UnauthorizedException;
import com.project.booktour.models.Review;
import com.project.booktour.models.User;
import com.project.booktour.responses.ReviewResponse;
import com.project.booktour.services.tour.ITourService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ITourService tourService;

    @GetMapping("")
    public ResponseEntity<List<ReviewResponse>> getAllReviews(
            @RequestParam(value = "user_id", required = false) Long userId,
            @RequestParam("tour_id") Long tourId
    ) {
        List<ReviewResponse> reviewResponses;
        if (userId == null) {
            reviewResponses = tourService.getReviewsByTour(tourId).stream()
                    .map(ReviewResponse::fromReview)
                    .collect(Collectors.toList());
        } else {
            reviewResponses = tourService.getReviewsByUserAndTour(userId, tourId).stream()
                    .map(ReviewResponse::fromReview)
                    .collect(Collectors.toList());
        }
        return ResponseEntity.ok(reviewResponses);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> insertReview(
            @Valid @RequestBody ReviewDTO reviewDTO
    ) {
        try {
            User loginUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!Objects.equals(loginUser.getUserId(), reviewDTO.getUserId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You cannot review as another user");
            }
            Review review = tourService.createReview(reviewDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Review created successfully for tour ID: " + review.getTour().getTourId());
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("An error occurred during review creation: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> updateReview(
            @PathVariable("id") Long reviewId,
            @Valid @RequestBody ReviewDTO reviewDTO
    ) {
        try {
            User loginUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (!Objects.equals(loginUser.getUserId(), reviewDTO.getUserId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("You cannot update another user's review");
            }
            tourService.updateReview(reviewId, reviewDTO);
            return ResponseEntity.ok("Review updated successfully");
        } catch (UnauthorizedException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("An error occurred during review update: " + e.getMessage());
        }
    }
}