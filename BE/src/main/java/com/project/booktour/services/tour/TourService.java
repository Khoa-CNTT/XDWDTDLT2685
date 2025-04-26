package com.project.booktour.services.tour;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.booktour.dtos.ReviewDTO;
import com.project.booktour.dtos.TourDTO;
import com.project.booktour.dtos.TourImageDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.exceptions.InvalidParamException;
import com.project.booktour.exceptions.UnauthorizedException;
import com.project.booktour.models.*;
import com.project.booktour.repositories.ReviewRepository;
import com.project.booktour.repositories.TourImageRepository;
import com.project.booktour.repositories.TourRepository;
import com.project.booktour.repositories.UserRepository;
import com.project.booktour.responses.SimplifiedTourResponse;
import com.project.booktour.responses.TourResponse;
import com.project.booktour.services.booking.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourService implements ITourService {
    private final TourRepository tourRepository;
    private final TourImageRepository tourImageRepository;
    private final ObjectMapper objectMapper;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final BookingService bookingService;

    @Override
    public Tour createTour(TourDTO tourDTO) throws DataNotFoundException, JsonProcessingException, InvalidParamException {
        Tour newTour = Tour.builder()
                .title(tourDTO.getTitle())
                .description(tourDTO.getDescription())
                .quantity(tourDTO.getQuantity())
                .priceAdult(tourDTO.getPriceAdult())
                .priceChild(tourDTO.getPriceChild())
                .duration(tourDTO.getDuration())
                .destination(tourDTO.getDestination())
                .availability(tourDTO.isAvailability())
                .itinerary(tourDTO.getItinerary() != null ? objectMapper.writeValueAsString(tourDTO.getItinerary()) : null)
                .region(Region.valueOf(tourDTO.getRegion().toUpperCase()))
                .tourImages(new ArrayList<>())
                .build();

        Tour savedTour = tourRepository.save(newTour);

        if (tourDTO.getImages() != null && !tourDTO.getImages().isEmpty()) {
            if (tourDTO.getImages().size() > 5) {
                throw new InvalidParamException("Number of images must be <= 5");
            }

            List<TourImage> tourImages = tourDTO.getImages().stream()
                    .map(imageUrl -> {
                        TourImage tourImage = new TourImage();
                        tourImage.setTour(savedTour);
                        String fileName = imageUrl.replace("http://localhost:8088/api/v1/tours/images/", "");
                        tourImage.setImageUrl(fileName);
                        return tourImage;
                    })
                    .collect(Collectors.toList());

            savedTour.setTourImages(tourImages);
            tourRepository.save(savedTour);
        }

        return savedTour;
    }

    @Override
    public Tour getTourById(Long tourId) throws Exception {
        return tourRepository.findById(tourId)
                .orElseThrow(() -> new DataNotFoundException("Tour not found with id: " + tourId));
    }

    @Override
    public TourResponse getTourDetails(Long id) throws DataNotFoundException {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Tour not found with id: " + id));

        List<String> imageUrls = tour.getTourImages().stream()
                .map(TourImage::getImageUrl)
                .filter(Objects::nonNull)
                .map(url -> "http://localhost:8088/api/v1/tours/images/" + url)
                .collect(Collectors.toList());

        if (imageUrls.isEmpty()) {
            imageUrls = Collections.singletonList("http://localhost:8088/api/v1/tours/images/notfound.jpeg");
        }

        try {
            return TourResponse.fromTour(tour, objectMapper, imageUrls);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse tour details for tour with id: " + id, e);
        }
    }

    @Override
    public Page<SimplifiedTourResponse> getAllTours(PageRequest pageRequest) {
        return tourRepository.findAllWithAverageRatingAndFirstImage(pageRequest)
                .map(result -> {
                    Tour tour = (Tour) result[0];
                    Double avgRating = (Double) result[1];
                    String firstImageUrl = (String) result[2];

                    try {
                        SimplifiedTourResponse response = SimplifiedTourResponse.fromTour(tour, objectMapper);
                        response.setStar(avgRating.floatValue());

                        String imageUrl = null;
                        if (firstImageUrl != null && !firstImageUrl.isEmpty()) {
                            String baseUrl = "http://localhost:8088/api/v1/tours/images/";
                            imageUrl = baseUrl + firstImageUrl;
                        }
                        response.setImage(imageUrl);

                        return response;
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to parse itinerary for tour with id: " + tour.getTourId(), e);
                    }
                });
    }

    @Override
    public Tour updateTour(Long id, TourDTO tourDTO) throws Exception {
        Tour existingTour = getTourById(id);
        if (existingTour != null) {
            existingTour.setTitle(tourDTO.getTitle());
            existingTour.setDescription(tourDTO.getDescription());
            existingTour.setQuantity(tourDTO.getQuantity());
            existingTour.setPriceAdult(tourDTO.getPriceAdult());
            existingTour.setPriceChild(tourDTO.getPriceChild());
            existingTour.setDuration(tourDTO.getDuration());
            existingTour.setDestination(tourDTO.getDestination());
            existingTour.setAvailability(tourDTO.isAvailability());
            existingTour.setItinerary(tourDTO.getItinerary() != null ? objectMapper.writeValueAsString(tourDTO.getItinerary()) : null);
            existingTour.setRegion(Region.valueOf(tourDTO.getRegion().toUpperCase()));
            tourImageRepository.deleteByTourTourId(id);

            if (tourDTO.getImages() != null && !tourDTO.getImages().isEmpty()) {
                if (tourDTO.getImages().size() > 5) {
                    throw new InvalidParamException("Number of images must be <= 5");
                }

                List<TourImage> newTourImages = tourDTO.getImages().stream()
                        .map(imageUrl -> {
                            TourImage tourImage = new TourImage();
                            tourImage.setTour(existingTour);
                            String fileName = imageUrl.replace("http://localhost:8088/api/v1/tours/images/", "");
                            tourImage.setImageUrl(fileName);
                            return tourImage;
                        })
                        .collect(Collectors.toList());
                existingTour.setTourImages(newTourImages);
            } else {
                existingTour.setTourImages(new ArrayList<>());
            }

            return tourRepository.save(existingTour);
        }
        return null;
    }

    @Override
    public void deleteTour(Long id) {
        Optional<Tour> optionalTour = tourRepository.findById(id);
        optionalTour.ifPresent(tour -> {
            tourImageRepository.deleteByTourTourId(id);
            tourRepository.delete(tour);
        });
    }

    @Override
    public boolean existsByTitle(String title) {
        return tourRepository.existsByTitle(title);
    }

    @Override
    public TourImage createTourImage(Long tourId, TourImageDTO tourImageDTO) throws Exception {
        Tour existingTour = tourRepository.findById(tourId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find tour with id: " + tourId));

        long size = tourImageRepository.countByTourTourId(tourId);
        if (size >= 5) {
            throw new InvalidParamException("Number of images must be <= 5");
        }

        TourImage newTourImage = TourImage.builder()
                .tour(existingTour)
                .imageUrl(tourImageDTO.getImageUrl())
                .build();

        return tourImageRepository.save(newTourImage);
    }

    @Override
    public Review createReview(ReviewDTO reviewDTO) throws Exception {
        if (!bookingService.hasUserBookedTour(reviewDTO.getUserId(), reviewDTO.getTourId())) {
            throw new UnauthorizedException("User has not booked this tour and cannot leave a review");
        }
        Tour tour = tourRepository.findById(reviewDTO.getTourId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find tour with id: " + reviewDTO.getTourId()));

        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + reviewDTO.getUserId()));

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
        return reviewRepository.findByTourTourId(tourId).stream()
                .filter(review -> review.getUser().getUserId().equals(userId))
                .collect(Collectors.toList());
    }

    @Override
    public void updateReview(Long reviewId, ReviewDTO reviewDTO) throws Exception {
        if (!bookingService.hasUserBookedTour(reviewDTO.getUserId(), reviewDTO.getTourId())) {
            throw new UnauthorizedException("User has not booked this tour and cannot update a review");
        }
        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find review with id: " + reviewId));

        Tour tour = tourRepository.findById(reviewDTO.getTourId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find tour with id: " + reviewDTO.getTourId()));

        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + reviewDTO.getUserId()));

        existingReview.setTour(tour);
        existingReview.setUser(user);
        existingReview.setComment(reviewDTO.getComment());
        existingReview.setRating(reviewDTO.getRating());

        reviewRepository.save(existingReview);
    }
}