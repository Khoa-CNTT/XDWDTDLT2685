package com.project.booktour.responses.toursreponse;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.booktour.dtos.ScheduleDTO;
import com.project.booktour.models.Tour;
import com.project.booktour.responses.BaseResponse;
import com.project.booktour.responses.reviewsreponse.ReviewResponse;
import lombok.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourResponse extends BaseResponse {

    private Long id;
    private String title;
    @JsonProperty("price_adult")
    private String priceAdult;
    @JsonProperty("price_child")
    private String priceChild;
    @JsonProperty("img")
    private List<String> images;
    private int availableSlots; // Thay quantity bằng availableSlots
    private String description;
    private String duration;
    private String destination;
    private boolean availability;
    private List<ScheduleDTO> itinerary;
    private List<String> include;
    private List<String> notinclude;
    private LocalDate startDate;
    private LocalDate endDate;
    @JsonProperty("reviews")
    private List<ReviewResponse> reviews;
    @JsonProperty("average_rating")
    private Float averageRating;
    @JsonProperty("total_reviews")
    private Integer totalReviews;

    public static TourResponse fromTour(Tour tour, ObjectMapper objectMapper, List<String> imageUrls, List<ReviewResponse> reviews, Float averageRating, Integer totalReviews, int availableSlots) throws Exception {
        List<ScheduleDTO> itinerary = tour.getItinerary() != null
                ? objectMapper.readValue(tour.getItinerary(), new TypeReference<List<ScheduleDTO>>() {})
                : null;
        List<String> includeList = Arrays.asList(
                "Dịch vụ đón và trả khách",
                "1 bữa ăn mỗi ngày",
                "Bữa tối trên du thuyền & Sự kiện âm nhạc",
                "Tham quan 7 địa điểm tuyệt vời nhất trong thành phố",
                "Nước đóng chai trên xe buýt",
                "Phương tiện di chuyển Xe buýt du lịch hạng sang"
        );
        List<String> notIncludeList = Arrays.asList(
                "Tiền boa",
                "Đón và trả khách tại khách sạn",
                "Bữa trưa, Đồ ăn & Đồ uống",
                "Nâng cấp tùy chọn lên một ly",
                "Dịch vụ bổ sung",
                "Bảo hiểm"
        );
        TourResponse tourResponse = TourResponse.builder()
                .id(tour.getTourId())
                .title(tour.getTitle())
                .priceAdult(String.format("%,.0f VNĐ", tour.getPriceAdult()))
                .priceChild(String.format("%,.0f VNĐ", tour.getPriceChild()))
                .images(imageUrls)
                .availableSlots(availableSlots) // Sử dụng availableSlots
                .description(tour.getDescription())
                .duration(tour.getDuration())
                .destination(tour.getDestination())
                .availability(tour.getAvailability())
                .include(includeList)
                .notinclude(notIncludeList)
                .itinerary(itinerary)
                .startDate(tour.getStartDate())
                .endDate(tour.getEndDate())
                .reviews(reviews)
                .averageRating(averageRating)
                .totalReviews(totalReviews)
                .build();
        tourResponse.setCreatedAt(tour.getCreatedAt());
        tourResponse.setUpdatedAt(tour.getUpdatedAt());
        return tourResponse;
    }
}