package com.project.booktour.services.tour;

import com.project.booktour.dtos.TourDTO;
import com.project.booktour.dtos.TourImageDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.Tour;
import com.project.booktour.models.TourImage;
import com.project.booktour.responses.TourResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public interface ITourService {

    Tour createTour(TourDTO tourDTO) throws DataNotFoundException;

    Tour getTourById(Long tourId) throws Exception;

    Page<TourResponse> getAllTours(PageRequest pageRequest);

    Tour updateTour(Long id, TourDTO tourDTO) throws Exception;

    void deleteTour(Long id);

    boolean existsByTitle(String title);

    TourImage createTourImage(Long tourId, TourImageDTO tourImageDTO) throws Exception;
}