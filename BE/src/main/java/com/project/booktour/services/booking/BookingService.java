package com.project.booktour.services.booking;

import com.project.booktour.dtos.BookingDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.Booking;
import com.project.booktour.models.Promotion;
import com.project.booktour.models.Tour;
import com.project.booktour.models.User;
import com.project.booktour.repositories.BookingRepository;
import com.project.booktour.repositories.PromotionRepository;
import com.project.booktour.repositories.TourRepository;
import com.project.booktour.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BookingService implements IBookingService {
    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    private final PromotionRepository promotionRepository;
    private final BookingRepository bookingRepository;
    private final ModelMapper modelMapper;

    @Override
    public Booking createBooking(BookingDTO bookingDTO) throws Exception {
        // Tìm user
        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + bookingDTO.getUserId()));

        // Tìm tour
        Tour tour = tourRepository.findById(bookingDTO.getTourId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find tour with id: " + bookingDTO.getTourId()));

        // Tìm promotion (nếu có)
        Promotion promotion = null;
        if (bookingDTO.getPromotionId() != null) {
            promotion = promotionRepository.findById(bookingDTO.getPromotionId())
                    .orElseThrow(() -> new DataNotFoundException("Cannot find promotion with id: " + bookingDTO.getPromotionId()));
        }

        // Kiểm tra bookingDate
        if (bookingDTO.getBookingDate() == null) {
            throw new IllegalArgumentException("Booking date cannot be null");
        }
        LocalDate bookingDate = bookingDTO.getBookingDate();
        if (bookingDate.isBefore(LocalDate.now())) {
            throw new DataNotFoundException("Booking date must be at least today!");
        }

        Booking booking = new Booking();
        booking.setNumAdults(bookingDTO.getNumAdults());
        booking.setNumChildren(bookingDTO.getNumChildren());
        booking.setTotalPrice(bookingDTO.getTotalPrice());
        booking.setBookingStatus("PENDING");
        booking.setSpecialRequests(bookingDTO.getSpecialRequests());
        booking.setBookingDate(bookingDate);
        booking.setUser(user);
        booking.setTour(tour);
        booking.setPromotion(promotion);
        return bookingRepository.save(booking);
    }
    @Override
    public Booking getBooking(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }
    @Override
    public Booking updateBooking(Long id, BookingDTO bookingDTO) throws DataNotFoundException {
        // Tìm booking
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find booking with id: " + id));

        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + bookingDTO.getUserId()));
        Tour tour = tourRepository.findById(bookingDTO.getTourId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find tour with id: " + bookingDTO.getTourId()));
        Promotion promotion = null;
        if (bookingDTO.getPromotionId() != null) {
            promotion = promotionRepository.findById(bookingDTO.getPromotionId())
                    .orElseThrow(() -> new DataNotFoundException("Cannot find promotion with id: " + bookingDTO.getPromotionId()));
        }
        if (bookingDTO.getBookingDate() == null) {
            throw new IllegalArgumentException("Booking date cannot be null");
        }
        LocalDate bookingDate = bookingDTO.getBookingDate();
        if (bookingDate.isBefore(LocalDate.now())) {
            throw new DataNotFoundException("Booking date must be at least today!");
        }
        booking.setNumAdults(bookingDTO.getNumAdults());
        booking.setNumChildren(bookingDTO.getNumChildren());
        booking.setTotalPrice(bookingDTO.getTotalPrice());
        booking.setBookingStatus(bookingDTO.getBookingStatus());
        booking.setSpecialRequests(bookingDTO.getSpecialRequests());
        booking.setBookingDate(bookingDate);
        booking.setUser(user);
        booking.setTour(tour);
        booking.setPromotion(promotion);
        return bookingRepository.save(booking);
    }
    @Override
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking != null) {
            booking.setBookingStatus("CANCELLED");
            bookingRepository.save(booking);
        }
    }

    @Override
    public List<Booking> findByUserId(Long userId) {
        return bookingRepository.findByUserUserId(userId);
    }

    @Override
    public boolean hasUserBookedTour(Long userId, Long tourId) {
        return bookingRepository.existsByUserUserIdAndTourTourId(userId, tourId);
    }
}