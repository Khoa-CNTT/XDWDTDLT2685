package com.project.booktour.services.tour;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.booktour.dtos.TourDTO;
import com.project.booktour.dtos.TourImageDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.exceptions.InvalidParamException;
import com.project.booktour.models.*;
import com.project.booktour.repositories.ReviewRepository;
import com.project.booktour.repositories.TourImageRepository;
import com.project.booktour.repositories.TourRepository;
import com.project.booktour.responses.reviewsreponse.ReviewResponse;
import com.project.booktour.responses.toursreponse.BookedTourResponse;
import com.project.booktour.responses.toursreponse.SimplifiedTourResponse;
import com.project.booktour.responses.toursreponse.TourResponse;
import com.project.booktour.services.booking.BookingService;
import com.project.booktour.services.review.ReviewService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourService implements ITourService {
    private static final Logger logger = LoggerFactory.getLogger(TourService.class);
    private final TourRepository tourRepository;
    private final TourImageRepository tourImageRepository;
    private final ObjectMapper objectMapper;
    private final ReviewRepository reviewRepository;
    private final ReviewService reviewService;
    private final BookingService bookingService;

    @Override
    public Tour createTour(TourDTO tourDTO) throws DataNotFoundException, JsonProcessingException, InvalidParamException {
        if (tourRepository.existsByTitle(tourDTO.getTitle())) {
            throw new InvalidParamException("Tour with title '" + tourDTO.getTitle() + "' already exists");
        }

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
                .startDate(tourDTO.getStartDate())
                .endDate(tourDTO.getEndDate())
                .tourImages(new ArrayList<>())
                .build();

        return tourRepository.save(newTour);
    }

    @Override
    public Tour getTourById(Long tourId) throws Exception {
        return tourRepository.findById(tourId)
                .orElseThrow(() -> new DataNotFoundException("Tour not found with id: " + tourId));
    }

    @Override
    public TourResponse getTourDetails(Long id) throws DataNotFoundException {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy tour với id: " + id));

        List<String> imageUrls = tourImageRepository.findByTourTourId(id).stream()
                .map(TourImage::getImageUrl)
                .filter(Objects::nonNull)
                .map(url -> "http://localhost:8088/api/v1/tours/images/" + url)
                .collect(Collectors.toList());

        if (imageUrls.isEmpty()) {
            imageUrls = Collections.singletonList("http://localhost:8088/api/v1/tours/images/notfound.jpeg");
        }

        // Sử dụng ReviewService để lấy danh sách đánh giá
        List<ReviewResponse> reviews = reviewService.getReviewListByTour(id);

        // Tính số sao trung bình và tổng số đánh giá
        Float averageRating = reviewRepository.findAverageRatingByTourId(id).orElse(0.0f);
        Integer totalReviews = reviewRepository.countByTourTourId(id);

        try {
            return TourResponse.fromTour(tour, objectMapper, imageUrls, reviews, averageRating, totalReviews);
        } catch (Exception e) {
            throw new RuntimeException("Không thể phân tích chi tiết tour với id: " + id, e);
        }
    }

    @Override
    public Page<SimplifiedTourResponse> getAllTours(PageRequest pageRequest, Double priceMin, Double priceMax, String region, Float starRating, String duration, String title) {
        logger.info("Fetching tours with filters: priceMin={}, priceMax={}, region={}, starRating={}, duration={}, title={}",
                priceMin, priceMax, region, starRating, duration, title);

        return tourRepository.findAllWithFilters(pageRequest, priceMin, priceMax, region, starRating, duration, title)
                .map(result -> {
                    Tour tour = (Tour) result[0];
                    Double avgRating = (Double) result[1];
                    String firstImageUrl = (String) result[2];

                    try {
                        SimplifiedTourResponse response = SimplifiedTourResponse.fromTour(tour, objectMapper);
                        response.setStar(avgRating != null ? avgRating.floatValue() : 0.0f);

                        if (firstImageUrl != null && !firstImageUrl.isEmpty()) {
                            String baseUrl = "http://localhost:8088/api/v1/tours/images/";
                            response.setImage(baseUrl + firstImageUrl);
                        } else {
                            response.setImage("http://localhost:8088/api/v1/tours/images/notfound.jpeg");
                        }

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
            if (!existingTour.getTitle().equals(tourDTO.getTitle()) && tourRepository.existsByTitle(tourDTO.getTitle())) {
                throw new InvalidParamException("Tour with title '" + tourDTO.getTitle() + "' already exists");
            }

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
            existingTour.setStartDate(tourDTO.getStartDate());
            existingTour.setEndDate(tourDTO.getEndDate());

            return tourRepository.save(existingTour);
        }
        return null;
    }

    @Override
    @Transactional
    public void deleteTour(Long id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found with id: " + id));

        tourImageRepository.deleteAll(tour.getTourImages());
        reviewRepository.deleteAll(tour.getReviews());
        tourRepository.delete(tour);
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
    public List<Review> getReviewsByTour(Long tourId) {
        return reviewRepository.findByTourTourId(tourId);
    }

    @Override
    public List<Review> getReviewsByUserAndTour(Long userId, Long tourId) {
        return reviewRepository.findByTourTourIdAndUserUserId(tourId, userId);
    }

    private List<TourImage> createTourImagesFromDTO(Tour tour, List<String> imageUrls) throws InvalidParamException {
        if (imageUrls == null || imageUrls.isEmpty()) {
            return new ArrayList<>();
        }
        if (imageUrls.size() > 5) {
            throw new InvalidParamException("Number of images must be <= 5");
        }
        return imageUrls.stream()
                .map(imageUrl -> {
                    TourImage tourImage = new TourImage();
                    tourImage.setTour(tour);
                    String fileName = imageUrl.replace("http://localhost:8088/api/v1/tours/images/", "");
                    tourImage.setImageUrl(fileName);
                    return tourImage;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<TourImage> updateTourImages(Long tourId, List<TourImageDTO> tourImageDTOs) throws Exception {
        Tour existingTour = tourRepository.findById(tourId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find tour with id: " + tourId));

        if (tourImageDTOs != null && tourImageDTOs.size() > 5) {
            throw new InvalidParamException("Number of images must be <= 5");
        }

        existingTour.getTourImages().clear();

        if (tourImageDTOs != null && !tourImageDTOs.isEmpty()) {
            for (TourImageDTO dto : tourImageDTOs) {
                TourImage newTourImage = new TourImage();
                newTourImage.setTour(existingTour);
                newTourImage.setImageUrl(dto.getImageUrl());
                existingTour.getTourImages().add(newTourImage);
            }
        }

        Tour savedTour = tourRepository.save(existingTour);

        return savedTour.getTourImages();
    }
    public List<BookedTourResponse> getBookedToursByUserId(Long userId) {
        List<Booking> bookings = bookingService.findBookingsByUserId(userId);
        if (bookings.isEmpty()) {
            return Collections.emptyList();
        }

        return bookings.stream()
                .map(booking -> {
                    try {
                        return BookedTourResponse.fromBooking(booking, objectMapper);
                    } catch (Exception e) {
                        throw new RuntimeException("Lỗi khi chuyển đổi booking: " + e.getMessage());
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}