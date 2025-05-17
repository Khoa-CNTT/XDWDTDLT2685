package com.project.booktour.repositories;

import com.project.booktour.models.Checkout;
import com.project.booktour.models.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    Optional<Invoice> findByBookingId(Long bookingId);
}
