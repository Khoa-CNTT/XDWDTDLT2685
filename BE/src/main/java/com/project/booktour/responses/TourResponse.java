package com.project.booktour.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.booktour.dtos.ScheduleDTO;
import com.project.booktour.models.Tour;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourResponse extends BaseResponse {
    private String title;

    @JsonProperty("price_adult")
    private Double priceAdult;

    @JsonProperty("price_child")
    private Double priceChild;

    private String image;
    private int quantity;
    private String description;
    private String duration;
    private String destination;
    private boolean availability;
    private List<ScheduleDTO> itinerary;
    private String reviews;

    public static TourResponse fromTour(Tour tour, ObjectMapper objectMapper) throws Exception {
        List<ScheduleDTO> itinerary = tour.getItinerary() != null
                ? objectMapper.readValue(tour.getItinerary(), new TypeReference<List<ScheduleDTO>>() {})
                : null;

        TourResponse tourResponse = TourResponse.builder()
                .title(tour.getTitle())
                .priceAdult(tour.getPriceAdult())
                .priceChild(tour.getPriceChild())
                .image(tour.getImage())
                .quantity(tour.getQuantity())
                .description(tour.getDescription())
                .duration(tour.getDuration())
                .destination(tour.getDestination())
                .availability(tour.getAvailability())
                .itinerary(itinerary)
                .reviews(tour.getReviews())
                .build();
        tourResponse.setCreatedAt(tour.getCreatedAt());
        tourResponse.setUpdatedAt(tour.getUpdatedAt());
        return tourResponse;
    }
}