package com.project.booktour.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "checkout")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Checkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "checkout_id")
    private Long checkoutId;

    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Column(name = "payment_method", length = 255, nullable = false)
    private String paymentMethod;

    @Column(name = "payment_details", length = 255, nullable = false)
    private String paymentDetails;

    @Column(name = "payment_date", nullable = false)
    private LocalDateTime paymentDate;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "payment_status", length = 255, nullable = false)
    private String paymentStatus;

    @Column(name = "transaction_id", length = 255, nullable = false)
    private String transactionId;
}