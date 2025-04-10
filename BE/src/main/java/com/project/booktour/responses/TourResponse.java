package com.project.booktour.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.booktour.dtos.ScheduleDTO;
import com.project.booktour.models.Tour;
import lombok.*;

import java.util.Arrays;
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
    private List<String> include; // Thêm trường include
    private List<String> notinclude; // Thêm trường notinclude

    public static TourResponse fromTour(Tour tour, ObjectMapper objectMapper) throws Exception {
        List<ScheduleDTO> itinerary = tour.getItinerary() != null
                ? objectMapper.readValue(tour.getItinerary(), new TypeReference<List<ScheduleDTO>>() {})
                : null;

        // Hardcode giá trị cho include và notinclude
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
                .title(tour.getTitle())
                .priceAdult(tour.getPriceAdult())
                .priceChild(tour.getPriceChild())
                .image(tour.getImage())
                .quantity(tour.getQuantity())
                .description(tour.getDescription())
                .duration(tour.getDuration())
                .destination(tour.getDestination())
                .availability(tour.getAvailability())
                .include(includeList)
                .notinclude(notIncludeList)
                .itinerary(itinerary)
                .build();
        tourResponse.setCreatedAt(tour.getCreatedAt());
        tourResponse.setUpdatedAt(tour.getUpdatedAt());
        return tourResponse;
    }
}