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
        modelMapper.typeMap(BookingDTO.class, Booking.class)
                .addMappings(mapper -> {
                    mapper.skip(Booking::setBookingId);
                    mapper.skip(Booking::setUser);
                    mapper.skip(Booking::setTour);
                    mapper.skip(Booking::setPromotion);
                    mapper.map(BookingDTO::getNumAdults, Booking::setNumAdults);
                    mapper.map(BookingDTO::getNumChildren, Booking::setNumChildren);
                    mapper.map(BookingDTO::getTotalPrice, Booking::setTotalPrice);
                    mapper.map(BookingDTO::getBookingStatus, Booking::setBookingStatus);
                    mapper.map(BookingDTO::getSpecialRequests, Booking::setSpecialRequests);
                    mapper.map(BookingDTO::getBookingDate, Booking::setBookingDate);
                });

        // Ánh xạ DTO sang entity
        modelMapper.map(bookingDTO, booking);

        // Gán các thuộc tính phức tạp thủ công
        booking.setUser(user);
        booking.setTour(tour);
        booking.setPromotion(promotion);

        // Đảm bảo bookingDate được set đúng (đã ánh xạ ở trên, nhưng để chắc chắn)
        booking.setBookingDate(bookingDate);
        booking.setBookingStatus("PENDING"); // Trạng thái mặc định

        // Lưu booking
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

        // Cấu hình ModelMapper chặt chẽ hơn
        modelMapper.typeMap(BookingDTO.class, Booking.class)
                .addMappings(mapper -> {
                    mapper.skip(Booking::setBookingId); // Bỏ qua bookingId
                    mapper.skip(Booking::setUser);      // Bỏ qua user
                    mapper.skip(Booking::setTour);      // Bỏ qua tour
                    mapper.skip(Booking::setPromotion); // Bỏ qua promotion
                    // Ánh xạ các thuộc tính đơn giản
                    mapper.map(BookingDTO::getNumAdults, Booking::setNumAdults);
                    mapper.map(BookingDTO::getNumChildren, Booking::setNumChildren);
                    mapper.map(BookingDTO::getTotalPrice, Booking::setTotalPrice);
                    mapper.map(BookingDTO::getBookingStatus, Booking::setBookingStatus);
                    mapper.map(BookingDTO::getSpecialRequests, Booking::setSpecialRequests);
                    mapper.map(BookingDTO::getBookingDate, Booking::setBookingDate);
                });

        // Ánh xạ DTO sang entity
        modelMapper.map(bookingDTO, booking);

        // Gán các thuộc tính phức tạp thủ công
        booking.setUser(user);
        booking.setTour(tour);
        booking.setPromotion(promotion);
        booking.setBookingDate(bookingDate); // Đảm bảo bookingDate được set đúng

        // Lưu booking
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