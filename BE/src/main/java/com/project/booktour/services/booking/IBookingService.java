package com.project.booktour.services.booking;

import com.project.booktour.dtos.BookingDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface IBookingService {
    Booking createBooking(BookingDTO bookingDTO) throws Exception;

    BookingDTO getBooking(Long id) throws DataNotFoundException;

    Booking updateBooking(Long id, BookingDTO bookingDTO) throws DataNotFoundException;

    void deleteBooking(Long id) throws DataNotFoundException;

    List<BookingDTO> findByUserId(Long userId) throws DataNotFoundException;
    boolean hasUserBookedTour(Long userId, Long tourId);
    Page<BookingDTO> getAllBookings(String keyword ,PageRequest pageRequest);
    Optional<Booking> findById(Long id) throws DataNotFoundException;
}