package com.project.booktour.services.tour;

import com.project.booktour.dtos.TourDTO;
import com.project.booktour.dtos.TourImageDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.exceptions.InvalidParamException;
import com.project.booktour.models.Tour;
import com.project.booktour.models.TourImage;
import com.project.booktour.repositories.TourImageRepository;
import com.project.booktour.repositories.TourRepository;
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

    @Override
    public Tour createTour(TourDTO tourDTO) throws DataNotFoundException {
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
                .itinerary(tourDTO.getItinerary())
                .reviews(tourDTO.getReviews())
                .build();

        return tourRepository.save(newTour);
    }

    @Override
    public Tour getTourById(Long tourId) throws Exception {
        return tourRepository.findById(tourId)
                .orElseThrow(() -> new DataNotFoundException("Can't find tour with id: " + tourId));
    }

    @Override
    public Page<TourResponse> getAllTours(PageRequest pageRequest) {
        // Lấy danh sách tour theo trang (page) và giới hạn
        return tourRepository.findAll(pageRequest).map(TourResponse::fromTour);
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
            existingTour.setItinerary(tourDTO.getItinerary());
            existingTour.setReviews(tourDTO.getReviews());
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

        // Không cho insert quá 5 ảnh cho 1 tour
        int size = tourImageRepository.findByTourTourId(tourId).size();
        if (size >= 5) {
            throw new InvalidParamException("Number of images must be <= 5");
        }

        return tourImageRepository.save(newTourImage);
    }
}