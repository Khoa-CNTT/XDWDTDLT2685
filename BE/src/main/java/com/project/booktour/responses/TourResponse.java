package com.project.booktour.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.booktour.dtos.ScheduleDTO;
import com.project.booktour.models.Tour;
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
    private String title;

    @JsonProperty("price_adult")
    private Double priceAdult;

    @JsonProperty("price_child")
    private Double priceChild;

    @JsonProperty("img")
    private List<String> images;

    private String code;

    private int quantity;
    private String description;
    private String duration;
    private String destination;
    private boolean availability;
    private List<ScheduleDTO> itinerary;
    private List<String> include;
    private List<String> notinclude;
    private LocalDate startDate;
    private LocalDate endDate;


    public static TourResponse fromTour(Tour tour, ObjectMapper objectMapper, List<String> imageUrls) throws Exception {
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
                .images(imageUrls)
                .quantity(tour.getQuantity())
                .description(tour.getDescription())
                .duration(tour.getDuration())
                .destination(tour.getDestination())
                .availability(tour.getAvailability())
                .include(includeList)
                .notinclude(notIncludeList)
                .itinerary(itinerary)
                .startDate(tour.getStartDate())
                .endDate(tour.getEndDate())
                .build();
        tourResponse.setCreatedAt(tour.getCreatedAt());
        tourResponse.setUpdatedAt(tour.getUpdatedAt());
        String code = generateCodeFromTitle(tour.getDestination());
        tourResponse.setCode(code);
        return tourResponse;
    }
    private static String generateCodeFromTitle(String destination) {
        if (destination == null || destination.isBlank()) {
            return "UNKNOWN";
        }

        // Tách các điểm đến theo dấu '-'
        String[] parts = destination.split("-");
        StringBuilder codeBuilder = new StringBuilder();

        for (String part : parts) {
            // Xóa khoảng trắng đầu/cuối và chuyển thành chữ in hoa
            part = part.trim().toUpperCase();

            // Tách theo khoảng trắng để lấy chữ cái đầu tiên của mỗi từ (VD: "Hà Nội" → HN)
            String[] words = part.split("\\s+");
            for (String word : words) {
                if (!word.isEmpty()) {
                    codeBuilder.append(removeVietnameseAccent(word.charAt(0)));
                }
            }
        }

        return codeBuilder.toString();
    }

    // Hàm hỗ trợ để loại bỏ dấu tiếng Việt
    private static char removeVietnameseAccent(char c) {
        String original = "ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯàáâãèéêìíòóôõùúăđĩũơư";
        String replacement = "AAAAEEEIIOOOOUUAĐIUOUaaaaeeeiioooouuadiuou";

        int index = original.indexOf(c);
        if (index >= 0) {
            return replacement.charAt(index);
        }
        return c;
    }

}