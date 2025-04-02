package com.project.booktour.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "booking")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "booking_date", nullable = false)
    private LocalDate bookingDate;

    @Column(name = "num_adults", nullable = false)
    private Integer numAdults;

    @Column(name = "num_children", nullable = false)
    private Integer numChildren;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    @Column(name = "booking_status", length = 255, nullable = false)
    private String bookingStatus;

    @Column(name = "special_requests", length = 255)
    private String specialRequests;

    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;

    @ManyToOne
    @JoinColumn(name = "promotion_id")
    private Promotion promotion;
}