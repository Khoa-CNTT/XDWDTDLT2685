// com.project.booktour.controllers.BookingController.java
package com.project.booktour.controllers;

import com.project.booktour.dtos.BookingDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.Booking;
import com.project.booktour.models.Checkout;
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

@RestController
@RequestMapping("${api.prefix}/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final CheckoutRepository checkoutRepository;
    private final PaymentService paymentService;

    // com.project.booktour.controllers.BookingController.java
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

            // Lấy payment_method từ BookingDTO
            String paymentMethod = bookingDTO.getPaymentMethod();
            if (!"VNPAY".equalsIgnoreCase(paymentMethod) && !"OFFICE".equalsIgnoreCase(paymentMethod)) {
                return ResponseEntity.badRequest().body("Invalid payment method. Must be 'VNPAY' or 'OFFICE'");
            }

            // Khởi tạo checkout với paymentDate mặc định
            Checkout checkout = Checkout.builder()
                    .booking(booking)
                    .paymentMethod(paymentMethod.toUpperCase())
                    .paymentDetails(paymentMethod.equalsIgnoreCase("VNPAY") ? "Initiated VNPAY payment" : "Payment to be processed at office")
                    .amount(booking.getTotalPrice())
                    .paymentStatus("PENDING")
                    .transactionId(String.valueOf(booking.getBookingId()))
                    .paymentDate(LocalDateTime.now()) // Gán giá trị mặc định
                    .build();
            checkoutRepository.save(checkout);

            // Nếu chọn VNPAY, tạo URL thanh toán
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
            List<Booking> bookings = bookingService.findByUserId(userId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBooking(@Valid @PathVariable("id") Long bookingId) {
        try {
            BookingDTO bookingDTO = bookingService.getBooking(bookingId);
            return ResponseEntity.ok(bookingDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBooking(@Valid @PathVariable long id, @Valid @RequestBody BookingDTO bookingDTO) {
        try {
            Booking booking = bookingService.updateBooking(id, bookingDTO);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBooking(@Valid @PathVariable Long id) {
        try {
            bookingService.deleteBooking(id);
            return ResponseEntity.ok("Booking deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}