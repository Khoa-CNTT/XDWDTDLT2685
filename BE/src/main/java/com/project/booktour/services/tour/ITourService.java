package com.project.booktour.services.tour;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.booktour.dtos.TourDTO;
import com.project.booktour.dtos.TourImageDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.exceptions.InvalidParamException;
import com.project.booktour.models.Review;
import com.project.booktour.models.Tour;
import com.project.booktour.models.TourImage;
import com.project.booktour.responses.toursreponse.BookedTourResponse;
import com.project.booktour.responses.toursreponse.SimplifiedTourResponse;
import com.project.booktour.responses.toursreponse.TourResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Map;

public interface ITourService {

    Tour createTour(TourDTO tourDTO) throws DataNotFoundException, JsonProcessingException, InvalidParamException;

    Tour getTourById(Long tourId) throws Exception;

    TourResponse getTourDetails(Long id) throws DataNotFoundException;

    Page<SimplifiedTourResponse> getAllTours(PageRequest pageRequest, Double priceMin, Double priceMax, String region, Float starRating, String duration, String title);

    Tour updateTour(Long id, TourDTO tourDTO) throws Exception;

    void deleteTour(Long id);

    boolean existsByTitle(String title);

    TourImage createTourImage(Long tourId, TourImageDTO tourImageDTO) throws Exception;

    List<Review> getReviewsByTour(Long tourId);

    List<Review> getReviewsByUserAndTour(Long userId, Long tourId);

    List<TourImage> updateTourImages(Long tourId, List<TourImageDTO> tourImageDTOs) throws Exception;

    List<BookedTourResponse>  getBookedToursByUserId(Long userId);
}