package com.project.booktour.services.review;

import com.project.booktour.dtos.ReviewDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.exceptions.InvalidParamException;
import com.project.booktour.exceptions.UnauthorizedException;
import com.project.booktour.models.Review;
import com.project.booktour.models.Tour;
import com.project.booktour.models.User;
import com.project.booktour.repositories.ReviewRepository;
import com.project.booktour.repositories.TourRepository;
import com.project.booktour.repositories.UserRepository;
import com.project.booktour.responses.ReviewResponse;
import com.project.booktour.services.booking.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {

    private final ReviewRepository reviewRepository;
    private final TourRepository tourRepository;
    private final UserRepository userRepository;
    private final BookingService bookingService;

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Review createReview(ReviewDTO reviewDTO) throws Exception {
        // Kiểm tra xem người dùng đã đặt tour chưa
        if (!bookingService.hasUserBookedTour(reviewDTO.getUserId(), reviewDTO.getTourId())) {
            throw new UnauthorizedException("Người dùng chưa đặt tour này và không thể để lại đánh giá");
        }

        // Kiểm tra xem người dùng đã đánh giá tour này chưa
        if (reviewRepository.existsByUserUserIdAndTourTourId(reviewDTO.getUserId(), reviewDTO.getTourId())) {
            throw new InvalidParamException("Người dùng đã đánh giá tour này trước đó");
        }

        Tour tour = tourRepository.findById(reviewDTO.getTourId())
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy tour với id: " + reviewDTO.getTourId()));

        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy người dùng với id: " + reviewDTO.getUserId()));

        Review review = Review.builder()
                .tour(tour)
                .user(user)
                .comment(reviewDTO.getComment())
                .rating(reviewDTO.getRating())
                .build();

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewsByTour(Long tourId) {
        return reviewRepository.findByTourTourId(tourId);
    }

    @Override
    public List<Review> getReviewsByUserAndTour(Long userId, Long tourId) {
        return reviewRepository.findByTourTourIdAndUserUserId(tourId, userId);
    }

    @Override
    public List<ReviewResponse> getReviewListByTour(Long tourId) throws DataNotFoundException {
        if (!tourRepository.existsById(tourId)) {
            throw new DataNotFoundException("Không tìm thấy tour với id: " + tourId);
        }

        List<Review> reviews = reviewRepository.findByTourTourId(tourId);

        return reviews.stream()
                .map(ReviewResponse::fromReview)
                .collect(Collectors.toList());
    }

    @Override
    public void updateReview(Long reviewId, ReviewDTO reviewDTO) throws Exception {
        // Kiểm tra xem người dùng đã đặt tour chưa
        if (!bookingService.hasUserBookedTour(reviewDTO.getUserId(), reviewDTO.getTourId())) {
            throw new UnauthorizedException("Người dùng chưa đặt tour này và không thể cập nhật đánh giá");
        }

        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy đánh giá với id: " + reviewId));

        Tour tour = tourRepository.findById(reviewDTO.getTourId())
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy tour với id: " + reviewDTO.getTourId()));

        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy người dùng với id: " + reviewDTO.getUserId()));

        existingReview.setTour(tour);
        existingReview.setUser(user);
        existingReview.setComment(reviewDTO.getComment());
        existingReview.setRating(reviewDTO.getRating());

        reviewRepository.save(existingReview);
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) throws Exception {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy đánh giá với id: " + reviewId));

        // Kiểm tra quyền sở hữu
        if (!review.getUser().getUserId().equals(userId)) {
            throw new UnauthorizedException("Bạn không có quyền xóa đánh giá của người khác");
        }

        reviewRepository.delete(review);
    }
}