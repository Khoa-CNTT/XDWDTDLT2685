package com.project.booktour.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingDTO {
    @Min(value = 1, message = "User ID must be greater than 0")
    private Long userId;
    @Min(value = 1, message = "Tour ID must be greater than 0")
    private Long tourId;
    private LocalDate bookingDate;
    @Min(value = 0, message = "Number of adults must be at least 0")
    private int numAdults;
    @Min(value = 0, message = "Number of children must be at least 0")
    private int numChildren;
    @Min(value = 0, message = "Total price must be at least 0")
    private Double totalPrice;
    @NotBlank(message = "Booking status is required")
    private String bookingStatus;
    private String specialRequests;
    private Long promotionId;
}
