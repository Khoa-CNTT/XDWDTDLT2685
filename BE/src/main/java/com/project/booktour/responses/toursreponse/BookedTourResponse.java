package com.project.booktour.responses.toursreponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.booktour.models.Booking;
import com.project.booktour.models.Tour;
import com.project.booktour.models.TourImage;
import com.project.booktour.responses.BaseResponse;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookedTourResponse extends BaseResponse {

    private String title;
    private String description;
    private String duration;

    @JsonProperty("price_adult")
    private String priceAdult;

    @JsonProperty("image")
    private String image; // Thay List<String> images bằng String image

    @JsonProperty("startDate")
    private LocalDate startDate;

    @JsonProperty("endDate")
    private LocalDate endDate;

    @JsonProperty("bookingId")
    private Long bookingId;

    public static BookedTourResponse fromBooking(Booking booking, ObjectMapper objectMapper) throws Exception {
        Tour tour = booking.getTour();
        if (tour == null) {
            return null;
        }

        // Lấy URL ảnh đầu tiên từ TourImage
        String imageUrl = null;
        if (tour.getTourImages() != null && !tour.getTourImages().isEmpty()) {
            TourImage firstImage = tour.getTourImages().get(0);
            imageUrl = "http://localhost:8088/api/v1/tours/images/" + firstImage.getImageUrl();
        }

        BookedTourResponse response = new BookedTourResponse();
        response.setTitle(tour.getTitle());
        response.setDescription(tour.getDescription());
        response.setDuration(tour.getDuration());
        response.setPriceAdult(String.format("%,.0f VNĐ", tour.getPriceAdult())); // Định dạng giá
        response.setImage(imageUrl); // Gán URL ảnh đầu tiên
        response.setStartDate(tour.getStartDate());
        response.setEndDate(tour.getEndDate());
        response.setBookingId(booking.getBookingId());
        response.setCreatedAt(booking.getCreatedAt()); // Từ BaseResponse
        response.setUpdatedAt(booking.getUpdatedAt()); // Từ BaseResponse
        return response;
    }
}