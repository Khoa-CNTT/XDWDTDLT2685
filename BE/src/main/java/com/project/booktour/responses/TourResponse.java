package com.project.booktour.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.booktour.models.Tour;
import lombok.*;

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
    private String itinerary;
    private String reviews;

    public static TourResponse fromTour(Tour tour) {
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
                .itinerary(tour.getItinerary())
                .reviews(tour.getReviews())
                .build();

        tourResponse.setCreatedAt(tour.getCreatedAt());
        tourResponse.setUpdatedAt(tour.getUpdatedAt());
        return tourResponse;
    }
}