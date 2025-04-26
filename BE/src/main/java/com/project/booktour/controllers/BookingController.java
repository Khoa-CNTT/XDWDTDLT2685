package com.project.booktour.controllers;

import com.project.booktour.dtos.BookingDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.Booking;
import com.project.booktour.services.booking.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/bookings")
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
            return ResponseEntity.ok("Tour booked successfully");
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
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {
        try {
            PageRequest pageRequest = PageRequest.of(page, limit);
            Page<BookingDTO> bookings = bookingService.getAllBookings(pageRequest);
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
            return ResponseEntity.ok("Xóa thông tin 1 booking");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}