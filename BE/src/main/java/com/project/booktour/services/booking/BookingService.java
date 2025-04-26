package com.project.booktour.services.booking;

import com.project.booktour.dtos.BookingDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.*;
import com.project.booktour.repositories.BookingRepository;
import com.project.booktour.repositories.PromotionRepository;
import com.project.booktour.repositories.TourRepository;
import com.project.booktour.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
        booking.setBookingStatus(BookingStatus.PENDING); // Luôn đặt là PENDING
        booking.setSpecialRequests(bookingDTO.getSpecialRequests());
        booking.setBookingDate(bookingDate);
        booking.setUser(user);
        booking.setTour(tour);
        booking.setPromotion(promotion);
        booking.setFullName(bookingDTO.getFullName());
        booking.setEmail(bookingDTO.getEmail());
        booking.setAddress(bookingDTO.getAddress());
        booking.setPhoneNumber(bookingDTO.getPhoneNumber());
        return bookingRepository.save(booking);
    }

    @Override
    public Page<BookingDTO> getAllBookings(PageRequest pageRequest) {
        Page<Booking> bookingPage = bookingRepository.findAll(pageRequest);
        return bookingPage.map(booking -> BookingDTO.builder()
                .userId(booking.getUser().getUserId())
                .tourId(booking.getTour().getTourId())
                .bookingDate(booking.getBookingDate())
                .numAdults(booking.getNumAdults())
                .numChildren(booking.getNumChildren())
                .totalPrice(booking.getTotalPrice())
                .bookingStatus(booking.getBookingStatus())
                .specialRequests(booking.getSpecialRequests())
                .promotionId(booking.getPromotion() != null ? booking.getPromotion().getPromotionId() : null)
                .fullName(booking.getFullName())
                .email(booking.getEmail())
                .address(booking.getAddress())
                .phoneNumber(booking.getPhoneNumber())
                .build());
    }

    @Override
    public BookingDTO getBooking(Long id) throws DataNotFoundException {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find booking with id: " + id));

        return BookingDTO.builder()
                .userId(booking.getUser().getUserId())
                .tourId(booking.getTour().getTourId())
                .bookingDate(booking.getBookingDate())
                .numAdults(booking.getNumAdults())
                .numChildren(booking.getNumChildren())
                .totalPrice(booking.getTotalPrice())
                .bookingStatus(booking.getBookingStatus())
                .specialRequests(booking.getSpecialRequests())
                .promotionId(booking.getPromotion() != null ? booking.getPromotion().getPromotionId() : null)
                .fullName(booking.getFullName())
                .email(booking.getEmail())
                .address(booking.getAddress())
                .phoneNumber(booking.getPhoneNumber())
                .build();
    }

    @Override
    public Booking updateBooking(Long id, BookingDTO bookingDTO) throws DataNotFoundException {
        // Tìm booking
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find booking with id: " + id));

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

        booking.setNumAdults(bookingDTO.getNumAdults());
        booking.setNumChildren(bookingDTO.getNumChildren());
        booking.setTotalPrice(bookingDTO.getTotalPrice());
        booking.setBookingStatus(bookingDTO.getBookingStatus());
        booking.setSpecialRequests(bookingDTO.getSpecialRequests());
        booking.setBookingDate(bookingDate);
        booking.setUser(user);
        booking.setTour(tour);
        booking.setPromotion(promotion);
        booking.setFullName(bookingDTO.getFullName());
        booking.setEmail(bookingDTO.getEmail());
        booking.setAddress(bookingDTO.getAddress());
        booking.setPhoneNumber(bookingDTO.getPhoneNumber());
        return bookingRepository.save(booking);
    }

    @Override
    public void deleteBooking(Long id) throws DataNotFoundException {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find booking with id: " + id));
        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
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