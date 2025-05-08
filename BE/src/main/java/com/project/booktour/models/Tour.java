package com.project.booktour.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "tours")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Tour extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tour_id")
    private Long tourId;

    @Column(name = "title", length = 255, nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "LONGTEXT", nullable = false)
    private String description;


    @OneToMany(
            mappedBy = "tour",
            fetch = FetchType.LAZY,  // Nên dùng LAZY thay vì EAGER
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<TourImage> tourImages = new ArrayList<>();

    @OneToMany(
            mappedBy = "tour",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Review> reviews;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "price_adult", nullable = false)
    private Double priceAdult;

    @Column(name = "price_child", nullable = false)
    private Double priceChild;

    @Column(name = "duration", length = 255, nullable = false)
    private String duration;

    @Column(name = "destination", length = 255, nullable = false)
    private String destination;

    @Column(name = "availability", nullable = false)
    private Boolean availability = true;

    @Column(name = "itinerary", length = 255, nullable = false)
    private String itinerary;

    @Enumerated(EnumType.STRING)
    @Column(name = "region", nullable = false)
    private Region region;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

}