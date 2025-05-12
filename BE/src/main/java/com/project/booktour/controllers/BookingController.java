package com.project.booktour.controllers;

import com.project.booktour.dtos.BookingDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.Booking;
import com.project.booktour.models.BookingStatus;
import com.project.booktour.models.Checkout;
import com.project.booktour.models.PaymentStatus;
import com.project.booktour.repositories.CheckoutRepository;
import com.project.booktour.services.PaymentService;
import com.project.booktour.services.booking.BookingService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("${api.prefix}/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final CheckoutRepository checkoutRepository;
    private final PaymentService paymentService;

    @PostMapping("")
    public ResponseEntity<?> createBooking(
            @RequestBody @Valid BookingDTO bookingDTO,
            BindingResult result,
            HttpServletRequest request) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream().map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }

            Booking booking = bookingService.createBooking(bookingDTO);

            String paymentMethod = bookingDTO.getPaymentMethod();
            if (!"VNPAY".equalsIgnoreCase(paymentMethod) && !"OFFICE".equalsIgnoreCase(paymentMethod)) {
                return ResponseEntity.badRequest().body("Invalid payment method. Must be 'VNPAY' or 'OFFICE'");
            }

            Checkout checkout = Checkout.builder()
                    .booking(booking)
                    .paymentMethod(paymentMethod.toUpperCase())
                    .paymentDetails(paymentMethod.equalsIgnoreCase("VNPAY") ? "Initiated VNPAY payment" : "Payment to be processed at office")
                    .amount(booking.getTotalPrice())
                    .paymentStatus(PaymentStatus.PENDING)
                    .transactionId(String.valueOf(booking.getBookingId()))
                    .paymentDate(LocalDateTime.now())
                    .build();
            checkoutRepository.save(checkout);

            if ("VNPAY".equalsIgnoreCase(paymentMethod)) {
                String ipAddress = request.getRemoteAddr();
                String paymentUrl = paymentService.createPaymentUrl(booking.getBookingId(), ipAddress);
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Booking created successfully");
                response.put("paymentUrl", paymentUrl);
                response.put("bookingId", booking.getBookingId());
                return ResponseEntity.ok(response);
            }

            return ResponseEntity.ok("Booking created successfully. Please proceed to office payment.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> getBookings(@Valid @PathVariable("user_id") Long userId) {
        try {
            List<BookingDTO> bookings = bookingService.findByUserId(userId);
            return ResponseEntity.ok(bookings);
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred while retrieving bookings");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@Valid @PathVariable("id") Long bookingId) {
        try {
            BookingDTO bookingDTO = bookingService.getBooking(bookingId);
            return ResponseEntity.ok(bookingDTO);
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred while retrieving the booking");
        }
    }

    @GetMapping("")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllBookings(
            @RequestParam(defaultValue = "", required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {
        try {
            PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("bookingId").ascending());
            Page<BookingDTO> bookings = bookingService.getAllBookings(keyword, pageRequest);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred while retrieving bookings");
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateBooking(@Valid @PathVariable Long id, @Valid @RequestBody BookingDTO bookingDTO) {
        try {
            Booking booking = bookingService.updateBooking(id, bookingDTO);
            return ResponseEntity.ok(booking);
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred while updating the booking");
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteBooking(@Valid @PathVariable Long id) {
        try {
            bookingService.deleteBooking(id);
            return ResponseEntity.ok("Booking deleted successfully");
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred while deleting the booking");
        }
    }

    @PostMapping("/{bookingId}/confirm")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> confirmBooking(@PathVariable Long bookingId) {
        try {
            Optional<Booking> bookingOpt = bookingService.findById(bookingId);
            if (bookingOpt.isPresent()) {
                Booking booking = bookingOpt.get();
                if (booking.getBookingStatus() == BookingStatus.PENDING) {
                    booking.setBookingStatus(BookingStatus.CONFIRMED);
                    bookingService.updateBooking(booking.getBookingId(), convertToDTO(booking));
                    return ResponseEntity.ok("Booking confirmed successfully");
                }
                return ResponseEntity.badRequest().body("Booking is already confirmed or cannot be confirmed");
            }
            return ResponseEntity.badRequest().body("Cannot find booking with id: " + bookingId);
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred while confirming the booking");
        }
    }

    @PostMapping("/{bookingId}/confirm-payment")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> confirmOfficePayment(@PathVariable Long bookingId) {
        try {
            Optional<Checkout> checkoutOpt = checkoutRepository.findByBookingBookingId(bookingId);
            if (checkoutOpt.isPresent()) {
                Checkout checkout = checkoutOpt.get();
                if (checkout.getPaymentMethod().equalsIgnoreCase("OFFICE") && checkout.getPaymentStatus() == PaymentStatus.PENDING) {
                    checkout.setPaymentStatus(PaymentStatus.COMPLETED);
                    checkoutRepository.save(checkout);
                    return ResponseEntity.ok("Payment confirmed successfully");
                }
                return ResponseEntity.badRequest().body("Payment cannot be confirmed or is already completed");
            }
            return ResponseEntity.badRequest().body("Checkout not found");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("An error occurred while confirming payment");
        }
    }

    // Helper method to convert Booking to BookingDTO for update
    private BookingDTO convertToDTO(Booking booking) {
        return BookingDTO.builder()
                .userId(booking.getUser().getUserId())
                .tourId(booking.getTour().getTourId())
                .numAdults(booking.getNumAdults())
                .numChildren(booking.getNumChildren())
                .totalPrice(booking.getTotalPrice())
                .bookingStatus(booking.getBookingStatus())
                .specialRequests(booking.getSpecialRequests())
                .promotionId(booking.getPromotion() != null ? booking.getPromotion().getPromotionId() : null)
                .fullName(booking.getUser().getFullName())
                .email(booking.getUser().getEmail())
                .address(booking.getUser().getAddress())
                .phoneNumber(booking.getUser().getPhoneNumber())
                .createdAt(booking.getCreatedAt())
                .updatedAt(booking.getUpdatedAt())
                .build();
    }
}