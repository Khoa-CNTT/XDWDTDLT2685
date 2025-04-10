package com.project.booktour.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourDTO {

    @NotEmpty(message = "Title cannot be empty")
    @Size(min = 3, max = 255, message = "Title must be between 3 and 255 characters")
    private String title;

    @NotEmpty(message = "Description cannot be empty")
    private String description;


    private String image;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;

    @Min(value = 0, message = "Price for adult must be at least 0")
    @JsonProperty("price_adult")
    private double priceAdult;

    @Min(value = 0, message = "Price for child must be at least 0")
    @JsonProperty("price_child")
    private double priceChild;

    @NotEmpty(message = "Duration cannot be empty")
    private String duration;

    @NotEmpty(message = "Destination cannot be empty")
    private String destination;

    private boolean availability = true;

    @NotNull(message = "Itinerary cannot be null")
    private List<ScheduleDTO> itinerary;

}
