package com.project.booktour.services;

import com.project.booktour.components.VNPayUtil;
import com.project.booktour.configurations.VNPayConfig;
import com.project.booktour.models.Booking;
import com.project.booktour.models.BookingStatus;
import com.project.booktour.models.Checkout;
import com.project.booktour.repositories.BookingRepository;
import com.project.booktour.repositories.CheckoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class PaymentService {

    private final VNPayConfig vnPayConfig;
    private final BookingRepository bookingRepository;
    private final CheckoutRepository checkoutRepository;

    @Transactional
    public String createPaymentUrl(Long bookingId, String ipAddress) throws Exception {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getBookingStatus().equals(BookingStatus.PENDING)) {
            throw new RuntimeException("Booking is not in PENDING status");
        }

        String orderId = "BOOK-" + bookingId;
        double amount = booking.getTotalPrice();

        return VNPayUtil.generatePaymentUrl(vnPayConfig, orderId, amount, ipAddress);
    }

    @Transactional
    public void handlePaymentCallback(Map<String, String> params) throws Exception {
        String vnp_TxnRef = params.get("vnp_TxnRef");
        String vnp_TransactionStatus = params.get("vnp_TransactionStatus");
        String vnp_SecureHash = params.get("vnp_SecureHash");

        // Verify checksum
        boolean isValid = VNPayUtil.verifyChecksum(vnPayConfig, params, vnp_SecureHash);
        if (!isValid) {
            throw new RuntimeException("Invalid checksum");
        }

        // Extract booking ID from TxnRef (format: BOOK-<bookingId>)
        String[] parts = vnp_TxnRef.split("-");
        if (parts.length != 2 || !parts[0].equals("BOOK")) {
            throw new RuntimeException("Invalid TxnRef format");
        }
        Long bookingId = Long.parseLong(parts[1]);

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Update booking and create checkout record
        if ("00".equals(vnp_TransactionStatus)) {
            booking.setBookingStatus(BookingStatus.CONFIRMED);
            Checkout checkout = Checkout.builder()
                    .booking(booking)
                    .paymentMethod("VNPAY")
                    .paymentDetails("Transaction No: " + params.get("vnp_TransactionNo"))
                    .amount(Double.parseDouble(params.get("vnp_Amount")) / 100)
                    .paymentStatus("SUCCESS")
                    .transactionId(params.get("vnp_TransactionNo"))
                    .paymentDate(LocalDateTime.now())
                    .build();
            checkoutRepository.save(checkout);
        } else {
            booking.setBookingStatus(BookingStatus.CANCELLED);
        }

        bookingRepository.save(booking);
    }
}