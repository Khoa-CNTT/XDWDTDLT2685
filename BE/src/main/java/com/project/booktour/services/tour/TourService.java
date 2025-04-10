package com.project.booktour.services.tour;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.booktour.dtos.TourDTO;
import com.project.booktour.dtos.TourImageDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.exceptions.InvalidParamException;
import com.project.booktour.models.Tour;
import com.project.booktour.models.TourImage;
import com.project.booktour.repositories.TourImageRepository;
import com.project.booktour.repositories.TourRepository;
import com.project.booktour.responses.SimplifiedTourResponse;
import com.project.booktour.responses.TourResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TourService implements ITourService {
    private final TourRepository tourRepository;
    private final TourImageRepository tourImageRepository;
    private final ObjectMapper objectMapper;

    @Override
    public Tour createTour(TourDTO tourDTO) throws DataNotFoundException, JsonProcessingException {
        Tour newTour = Tour.builder()
                .title(tourDTO.getTitle())
                .description(tourDTO.getDescription())
                .image(tourDTO.getImage())
                .quantity(tourDTO.getQuantity())
                .priceAdult(tourDTO.getPriceAdult())
                .priceChild(tourDTO.getPriceChild())
                .duration(tourDTO.getDuration())
                .destination(tourDTO.getDestination())
                .availability(tourDTO.isAvailability())
                .itinerary(tourDTO.getItinerary() != null ? objectMapper.writeValueAsString(tourDTO.getItinerary()) : null)
                .build();

        return tourRepository.save(newTour);
    }

    @Override
    public Tour getTourById(Long tourId) throws Exception {
        return tourRepository.findById(tourId)
                .orElseThrow(() -> new DataNotFoundException("Can't find tour with id: " + tourId));
    }

    @Override
    public Page<SimplifiedTourResponse> getAllTours(PageRequest pageRequest) {
        return tourRepository.findAllWithAverageRating(pageRequest)
                .map(result -> {
                    Tour tour = (Tour) result[0];
                    Double avgRating = (Double) result[1];
                    try {
                        SimplifiedTourResponse response = SimplifiedTourResponse.fromTour(tour, objectMapper);
                        response.setStar(avgRating.floatValue());
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
            // Cập nhật các thuộc tính từ DTO sang Tour
            existingTour.setTitle(tourDTO.getTitle());
            existingTour.setDescription(tourDTO.getDescription());
            existingTour.setImage(tourDTO.getImage());
            existingTour.setQuantity(tourDTO.getQuantity());
            existingTour.setPriceAdult(tourDTO.getPriceAdult());
            existingTour.setPriceChild(tourDTO.getPriceChild());
            existingTour.setDuration(tourDTO.getDuration());
            existingTour.setDestination(tourDTO.getDestination());
            existingTour.setAvailability(tourDTO.isAvailability());
            // Chuyển List<ScheduleDTO> thành chuỗi JSON
            existingTour.setItinerary(tourDTO.getItinerary() != null ? objectMapper.writeValueAsString(tourDTO.getItinerary()) : null);
            return tourRepository.save(existingTour);
        }
        return null;
    }

    @Override
    public void deleteTour(Long id) {
        Optional<Tour> optionalTour = tourRepository.findById(id);
        optionalTour.ifPresent(tourRepository::delete);
    }

    @Override
    public boolean existsByTitle(String title) {
        return tourRepository.existsByTitle(title);
    }

    @Override
    public TourImage createTourImage(Long tourId, TourImageDTO tourImageDTO) throws Exception {
        Tour existingTour = tourRepository.findById(tourId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find tour with id: " + tourId));

        TourImage newTourImage = TourImage.builder()
                .tour(existingTour)
                .imageUrl(tourImageDTO.getImageUrl())
                .build();
        return tourImageRepository.save(newTourImage);
    }
}