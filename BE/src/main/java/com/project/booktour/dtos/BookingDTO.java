// com.project.booktour.dtos.BookingDTO.java
package com.project.booktour.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.booktour.models.BookingStatus;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

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

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("email")
    private String email;

    @JsonProperty("address")
    private String address;

    @JsonProperty("phone_number")
    private String phoneNumber;

    @JsonProperty("created_at")
    private LocalDateTime createdAt;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

    @NotNull(message = "Payment method is required")
    @Pattern(regexp = "^(VNPAY|OFFICE)$", message = "Payment method must be 'VNPAY' or 'OFFICE'")
    @JsonProperty("payment_method")
    private String paymentMethod;// Lấy từ checkout

    @JsonProperty("payment_status")
    private String paymentStatus; // Lấy từ checkout
}