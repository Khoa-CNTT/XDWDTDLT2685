package com.project.booktour.responses.toursreponse;

import com.project.booktour.models.Tour;
import com.project.booktour.models.TourImage;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TopBookedTourResponse {

    private Long id;
    private String title;
    private String duration;
    private String image;

    public static TopBookedTourResponse fromTour(Tour tour) {
        String imageUrl = null;
        if (tour.getTourImages() != null && !tour.getTourImages().isEmpty()) {
            TourImage firstImage = tour.getTourImages().get(0);
            imageUrl = "http://localhost:8088/api/v1/tours/images/" + firstImage.getImageUrl();
        } else {
            imageUrl = "http://localhost:8088/api/v1/tours/images/notfound.jpeg";
        }

        TopBookedTourResponse response = new TopBookedTourResponse();
        response.setId(tour.getTourId());
        response.setTitle(tour.getTitle());
        response.setDuration(tour.getDuration());
        response.setImage(imageUrl);
        return response;
    }
}