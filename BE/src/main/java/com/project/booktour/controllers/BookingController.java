package com.project.booktour.controllers;

import com.project.booktour.dtos.BookingDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.*;
import com.project.booktour.repositories.CheckoutRepository;
import com.project.booktour.repositories.TourRepository;
import com.project.booktour.services.checkout.PaymentService;
import com.project.booktour.services.booking.BookingService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

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

    private final TourRepository tourRepository; // Thêm TourRepository để kiểm tra tour
    @PostMapping("")
    public ResponseEntity<?> createBooking(
            @RequestBody @Valid BookingDTO bookingDTO,
            BindingResult result,
            HttpServletRequest request) {
        try {
            // Kiểm tra lỗi validate từ BookingDTO
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream().map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }

            // Kiểm tra tour có tồn tại và còn khả dụng không
            Optional<Tour> tourOpt = tourRepository.findById(bookingDTO.getTourId());
            if (!tourOpt.isPresent()) {
                return ResponseEntity.badRequest().body("Không tìm thấy tour");
            }

            Tour tour = tourOpt.get();
            if (!tour.getAvailability()) {
                return ResponseEntity.badRequest().body("Tour hiện không khả dụng");
            }

            // Tính tổng số chỗ yêu cầu (người lớn + trẻ em)
            int requestedSlots = bookingDTO.getNumAdults() + bookingDTO.getNumChildren();
            // Lấy số chỗ đã được đặt
            Long bookedSlots = bookingService.countBookingsByTourId(bookingDTO.getTourId());
            int availableSlots = tour.getQuantity() - bookedSlots.intValue();

            // Kiểm tra số chỗ trống
            if (requestedSlots > availableSlots) {
                return ResponseEntity.badRequest().body("Không đủ chỗ trống. Chỉ còn " + availableSlots + " chỗ.");
            }

            // Tiến hành tạo booking
            Booking booking = bookingService.createBooking(bookingDTO);

            // Kiểm tra phương thức thanh toán
            String paymentMethod = bookingDTO.getPaymentMethod();
            if (!"VNPAY".equalsIgnoreCase(paymentMethod) && !"OFFICE".equalsIgnoreCase(paymentMethod)) {
                return ResponseEntity.badRequest().body("Phương thức thanh toán không hợp lệ. Phải là 'VNPAY' hoặc 'OFFICE'");
            }

            // Nếu là VNPAY, tạo URL thanh toán
            if ("VNPAY".equalsIgnoreCase(paymentMethod)) {
                String ipAddress = request.getRemoteAddr();
                String paymentUrl = paymentService.createPaymentUrl(booking.getBookingId(), ipAddress);
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Đặt tour thành công");
                response.put("paymentUrl", paymentUrl);
                response.put("bookingId", booking.getBookingId());
                return ResponseEntity.ok(response);
            }

            return ResponseEntity.ok("Đặt tour thành công. Vui lòng thanh toán tại văn phòng.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
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

    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        try {
            bookingService.cancelBooking(id);
            return ResponseEntity.ok("Booking cancelled successfully");
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IllegalStateException e) {
            // Bắt lỗi huỷ gần ngày tour
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Log lỗi ra để debug
            return ResponseEntity.badRequest().body("Có lỗi xảy ra khi huỷ booking");
        }
    }



    @PostMapping("/{bookingId}/confirm-payment-and-booking")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> confirmPaymentAndBooking(@PathVariable Long bookingId) {
        try {
            // Kiểm tra thông tin checkout theo bookingId
            Optional<Checkout> checkoutOpt = checkoutRepository.findByBookingBookingId(bookingId);
            if (!checkoutOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy thông tin thanh toán (checkout)");
            }

            Checkout checkout = checkoutOpt.get();
            if (checkout.getPaymentStatus() != PaymentStatus.PENDING) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Thanh toán đã được xử lý hoặc không thể xác nhận");
            }

            // Kiểm tra booking có tồn tại không
            Optional<Booking> bookingOpt = bookingService.findById(bookingId);
            if (!bookingOpt.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy booking với ID: " + bookingId);
            }

            Booking booking = bookingOpt.get();
            if (booking.getBookingStatus() != BookingStatus.PENDING) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Booking đã được xác nhận hoặc không thể xác nhận lại");
            }

            // Cập nhật trạng thái thanh toán và booking
            checkout.setPaymentStatus(PaymentStatus.COMPLETED);
            checkoutRepository.save(checkout);

            booking.setBookingStatus(BookingStatus.CONFIRMED);
            bookingService.updateBooking(booking.getBookingId(), convertToDTO(booking));

            return ResponseEntity.ok("Xác nhận thanh toán và booking thành công");
        } catch (DataNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Đã xảy ra lỗi trong quá trình xác nhận thanh toán và booking");
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