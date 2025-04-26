



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
    private String image;
    private int quantity;
    private String title;

    private String location;

    private String description;

    private String price;

    private String date;

    private Float star;

    private String code;

    public static SimplifiedTourResponse fromTour(Tour tour, ObjectMapper objectMapper) throws Exception {
        SimplifiedTourResponse simplifiedTourResponse = new SimplifiedTourResponse();
        simplifiedTourResponse.setId(String.valueOf(tour.getTourId()));
        simplifiedTourResponse.setTitle(tour.getTitle());
        simplifiedTourResponse.setLocation(tour.getDestination());
        simplifiedTourResponse.setQuantity(tour.getQuantity());
        simplifiedTourResponse.setDescription(tour.getDescription());
        simplifiedTourResponse.setPrice(String.format("%,.0f VNĐ", tour.getPriceAdult())); // Định dạng price
        simplifiedTourResponse.setDate(tour.getDuration());
        simplifiedTourResponse.setCreatedAt(tour.getCreatedAt());
        simplifiedTourResponse.setUpdatedAt(tour.getUpdatedAt());

        String code = generateCodeFromTitle(tour.getTitle());
        simplifiedTourResponse.setCode(code);
        return simplifiedTourResponse;
    }
    private static String generateCodeFromTitle(String title) {
        if (title == null || !title.contains("|")) return "";

        String[] parts = title.split("\\|");
        String durationPart = parts[0].trim(); // ví dụ: "MIỀN TRUNG 4N3Đ"
        String locationsPart = parts[1].trim(); // ví dụ: "ĐÀ NẴNG – SƠN TRÀ – BÀ NÀ..."

        // 👉 Lấy phần thời lượng, ví dụ: 4N3Đ
        String duration = durationPart.replaceAll(".*?(\\d+N\\d+Đ).*", "$1").toUpperCase();
        duration = duration.replace("Đ", "D");

        // 👉 Tách các địa danh
        String[] locations = locationsPart.split("–|\\-");
        StringBuilder codeBuilder = new StringBuilder();

        for (String location : locations) {
            String[] words = location.trim().split("\\s+");
            for (String word : words) {
                if (!word.isEmpty()) {
                    codeBuilder.append(Character.toUpperCase(word.charAt(0)));
                }
            }
        }

        codeBuilder.append(duration);
        return codeBuilder.toString();
    }

}

