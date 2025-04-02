package com.project.booktour.controllers; // Sửa "controlers" thành "controllers"

import com.project.booktour.dtos.BookingDTO;
import com.project.booktour.models.Booking;
import com.project.booktour.services.booking.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/bookings") // Đổi từ "orders" thành "bookings"
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping("")
    public ResponseEntity<?> createBooking(@RequestBody @Valid BookingDTO bookingDTO, BindingResult result) {
        try {
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream().map(FieldError::getDefaultMessage).toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Booking booking = bookingService.createBooking(bookingDTO);
            return ResponseEntity.ok(booking);
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
            Booking existingBooking = bookingService.getBooking(bookingId);
            return ResponseEntity.ok(existingBooking);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Công việc của admin: cập nhật thông tin một booking
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
        bookingService.deleteBooking(id);
        return ResponseEntity.ok("Xóa thông tin 1 booking");
    }
}