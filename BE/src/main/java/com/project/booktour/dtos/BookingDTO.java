package com.project.booktour.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.booktour.models.BookingStatus;
import jakarta.validation.constraints.*;
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
    @JsonProperty("user_id")
    private Long userId;

    @Min(value = 1, message = "Tour ID must be greater than 0")
    @JsonProperty("tour_id")
    private Long tourId;

    @NotNull(message = "Booking date is required")
    @JsonProperty("booking_date")
    private LocalDate bookingDate;

    @Min(value = 0, message = "Number of adults must be at least 0")
    @JsonProperty("num_adults")
    private int numAdults;

    @Min(value = 0, message = "Number of children must be at least 0")
    @JsonProperty("num_children")
    private int numChildren;

    @Min(value = 0, message = "Total price must be at least 0")
    @JsonProperty("total_price")
    private Double totalPrice;

    @NotNull(message = "Booking status is required")
    @JsonProperty("booking_status")
    private BookingStatus bookingStatus;

    @JsonProperty("special_requests")
    private String specialRequests;

    @JsonProperty("promotion_id")
    private Long promotionId;

    @NotBlank(message = "Full name is required")
    @JsonProperty("full_name")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @JsonProperty("email")
    private String email;

    @JsonProperty("address")
    private String address;

    @NotBlank(message = "Phone number is required")
    @JsonProperty("phone_number")
    private String phoneNumber;
}