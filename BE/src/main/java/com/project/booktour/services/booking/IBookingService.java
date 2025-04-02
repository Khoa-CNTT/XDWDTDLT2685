package com.project.booktour.services.booking;

import com.project.booktour.dtos.BookingDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.Booking;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IBookingService {
    Booking createBooking(BookingDTO bookingDTO) throws Exception;

    Booking getBooking(Long id);

    Booking updateBooking(Long id, BookingDTO bookingDTO) throws DataNotFoundException;

    void deleteBooking(Long id);

    List<Booking> findByUserId(Long userId);
}