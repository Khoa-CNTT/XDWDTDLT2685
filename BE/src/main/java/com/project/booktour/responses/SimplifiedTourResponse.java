



package com.project.booktour.responses;



import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.booktour.models.Review;
import com.project.booktour.models.Tour;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SimplifiedTourResponse  extends BaseResponse {
    private String id;

    @JsonProperty("img")
    private List<String> images;

    private String title;

    private String location;

    private String description;

    private String price;

    private String date;

    private Float star;

    public static SimplifiedTourResponse fromTour(Tour tour, ObjectMapper objectMapper) throws Exception {
        SimplifiedTourResponse simplifiedTourResponse = new SimplifiedTourResponse();
        simplifiedTourResponse.setId(String.valueOf(tour.getTourId()));
        simplifiedTourResponse.setTitle(tour.getTitle());
        simplifiedTourResponse.setLocation(tour.getDestination());
        simplifiedTourResponse.setDescription(tour.getDescription());
        simplifiedTourResponse.setPrice(String.format("%,.0f VNĐ", tour.getPriceAdult())); // Định dạng price
        simplifiedTourResponse.setDate(tour.getDuration());
        simplifiedTourResponse.setCreatedAt(tour.getCreatedAt());
        simplifiedTourResponse.setUpdatedAt(tour.getUpdatedAt());
        return simplifiedTourResponse;
    }
}

