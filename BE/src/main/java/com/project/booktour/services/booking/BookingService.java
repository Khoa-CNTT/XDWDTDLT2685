package com.project.booktour.services.booking;

import com.project.booktour.dtos.BookingDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.*;
import com.project.booktour.repositories.BookingRepository;
import com.project.booktour.repositories.CheckoutRepository;
import com.project.booktour.repositories.PromotionRepository;
import com.project.booktour.repositories.TourRepository;
import com.project.booktour.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BookingService implements IBookingService {
    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    private final PromotionRepository promotionRepository;
    private final BookingRepository bookingRepository;
    private final CheckoutRepository checkoutRepository;
    private final ModelMapper modelMapper;

    @Override
    public Booking createBooking(BookingDTO bookingDTO) throws Exception {
        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + bookingDTO.getUserId()));
        Tour tour = tourRepository.findById(bookingDTO.getTourId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find tour with id: " + bookingDTO.getTourId()));

        Promotion promotion = null;
        if (bookingDTO.getPromotionId() != null) {
            promotion = promotionRepository.findById(bookingDTO.getPromotionId())
                    .orElseThrow(() -> new DataNotFoundException("Cannot find promotion with id: " + bookingDTO.getPromotionId()));
        }

        Booking booking = new Booking();
        booking.setNumAdults(bookingDTO.getNumAdults());
        booking.setNumChildren(bookingDTO.getNumChildren());
        booking.setTotalPrice(bookingDTO.getTotalPrice());
        booking.setBookingStatus(bookingDTO.getBookingStatus());
        booking.setSpecialRequests(bookingDTO.getSpecialRequests());
        booking.setFullName(bookingDTO.getFullName());
        booking.setPhoneNumber(bookingDTO.getPhoneNumber());
        booking.setEmail(bookingDTO.getEmail());
        booking.setAddress(bookingDTO.getAddress());
        booking.setUser(user);
        booking.setTour(tour);
        booking.setPromotion(promotion);
        Booking savedBooking = bookingRepository.save(booking);

        Checkout checkout = Checkout.builder()
                .booking(savedBooking)
                .paymentMethod(bookingDTO.getPaymentMethod() != null ? bookingDTO.getPaymentMethod() : "OFFICE")
                .paymentDetails(bookingDTO.getPaymentMethod() != null && bookingDTO.getPaymentMethod().equalsIgnoreCase("VNPAY") ? "Initiated VNPAY payment" : "Payment to be processed at office")
                .amount(bookingDTO.getTotalPrice())
                .paymentStatus(PaymentStatus.PENDING)
                .transactionId("BOOK-" + savedBooking.getBookingId())
                .paymentDate(LocalDateTime.now())
                .build();
        checkoutRepository.save(checkout);

        return savedBooking;
    }

    @Override
    public Page<BookingDTO> getAllBookings(String keyword, PageRequest pageRequest) {
        Page<Booking> bookingPage = bookingRepository.findAll(keyword, pageRequest);
        LocalDate currentDate = LocalDate.now();

        return bookingPage.map(booking -> {
            Optional<Checkout> checkoutOpt = checkoutRepository.findByBookingBookingId(booking.getBookingId());
            String paymentMethod = checkoutOpt.map(Checkout::getPaymentMethod).orElse(null);
            PaymentStatus paymentStatus = checkoutOpt.map(Checkout::getPaymentStatus).orElse(null);

            String formattedTourId = String.format("Tour%03d", booking.getTour().getTourId());

            // Kiểm tra và cập nhật trạng thái COMPLETED nếu tour đã kết thúc
            if (booking.getBookingStatus() == BookingStatus.CONFIRMED && booking.getTour().getEndDate().isBefore(currentDate)) {
                booking.setBookingStatus(BookingStatus.COMPLETED);
                booking.setUpdatedAt(LocalDateTime.now());
                bookingRepository.save(booking);
            }

            return BookingDTO.builder()
                    .title(booking.getTour().getTitle())
                    .bookingId(booking.getBookingId())
                    .userId(booking.getUser().getUserId())
                    .tourId(booking.getTour().getTourId())
                    .formattedTourId(formattedTourId)
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
                    .createdAt(booking.getCreatedAt())
                    .updatedAt(booking.getUpdatedAt())
                    .paymentMethod(paymentMethod)
                    .paymentStatus(paymentStatus != null ? paymentStatus.name() : null)
                    .build();
        });
    }

    @Override
    public BookingDTO getBooking(Long id) throws DataNotFoundException {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find booking with id: " + id));

        Optional<Checkout> checkoutOpt = checkoutRepository.findByBookingBookingId(booking.getBookingId());
        String paymentMethod = checkoutOpt.map(Checkout::getPaymentMethod).orElse(null);
        PaymentStatus paymentStatus = checkoutOpt.map(Checkout::getPaymentStatus).orElse(null);
        Tour tour   = booking.getTour();
        // Kiểm tra và cập nhật trạng thái COMPLETED nếu tour đã kết thúc
        LocalDate currentDate = LocalDate.now();
        if (booking.getBookingStatus() == BookingStatus.CONFIRMED && booking.getTour().getEndDate().isBefore(currentDate)) {
            booking.setBookingStatus(BookingStatus.COMPLETED);
            booking.setUpdatedAt(LocalDateTime.now());
            bookingRepository.save(booking);
        }

        return BookingDTO.builder()
                .bookingId(booking.getBookingId())
                .title(tour.getTitle())
                .userId(booking.getUser().getUserId())
                .tourId(tour.getTourId())
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
                .startDate(tour.getStartDate())
                .endDate(tour.getEndDate())
                .priceAdult(String.format("%,.0f VNĐ", tour.getPriceAdult())) // Chuyển sang Long
                .priceChild(String.format("%,.0f VNĐ", tour.getPriceAdult())) // Chuyển sang Long
                .createdAt(booking.getCreatedAt())
                .updatedAt(booking.getUpdatedAt())
                .paymentMethod(paymentMethod)
                .paymentStatus(paymentStatus != null ? paymentStatus.name() : null)
                .build();
    }

    @Override
    public Booking updateBooking(Long id, BookingDTO bookingDTO) throws DataNotFoundException {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find booking with id: " + id));
        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + bookingDTO.getUserId()));

        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        Tour tour = tourRepository.findById(bookingDTO.getTourId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find tour with id: " + bookingDTO.getTourId()));
        Promotion promotion = bookingDTO.getPromotionId() != null ? promotionRepository.findById(bookingDTO.getPromotionId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find promotion with id: " + bookingDTO.getPromotionId())) : null;

        booking.setNumAdults(bookingDTO.getNumAdults());
        booking.setNumChildren(bookingDTO.getNumChildren());
        booking.setTotalPrice(bookingDTO.getTotalPrice());
        booking.setSpecialRequests(bookingDTO.getSpecialRequests());
        booking.setFullName(bookingDTO.getFullName());
        booking.setPhoneNumber(bookingDTO.getPhoneNumber());
        booking.setEmail(bookingDTO.getEmail());
        booking.setAddress(bookingDTO.getAddress());
        booking.setUser(user);
        booking.setTour(tour);
        booking.setPromotion(promotion);

        if (bookingDTO.getBookingStatus() != null && booking.getBookingStatus() == BookingStatus.PENDING
                && bookingDTO.getBookingStatus() == BookingStatus.CONFIRMED) {
            booking.setBookingStatus(BookingStatus.CONFIRMED);
        }

        return bookingRepository.save(booking);
    }

    @Transactional
    public void cancelBooking(Long id) throws DataNotFoundException {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Không tìm thấy booking: " + id));

        // Chỉ giữ lại logic nghiệp vụ
        if (booking.getBookingStatus() != BookingStatus.PENDING &&
                booking.getBookingStatus() != BookingStatus.CONFIRMED) {
            throw new IllegalStateException("Chỉ có thể hủy booking ở trạng thái PENDING hoặc CONFIRMED");
        }

        if (booking.getTour().getStartDate().isBefore(LocalDate.now().plusDays(3))) {
            throw new IllegalStateException("Không thể hủy booking trong vòng 3 ngày trước khi tour bắt đầu");
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);
        booking.setUpdatedAt(LocalDateTime.now());
        bookingRepository.save(booking);
    }
    @Override
    public List<BookingDTO> findByUserId(Long userId) throws DataNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + userId));

        List<Booking> bookings = bookingRepository.findByUserUserId(userId);
        LocalDate currentDate = LocalDate.now();

        return bookings.stream().map(booking -> {
            Optional<Checkout> checkoutOpt = checkoutRepository.findByBookingBookingId(booking.getBookingId());
            String paymentMethod = checkoutOpt.map(Checkout::getPaymentMethod).orElse(null);
            PaymentStatus paymentStatus = checkoutOpt.map(Checkout::getPaymentStatus).orElse(null);

            // Kiểm tra và cập nhật trạng thái COMPLETED nếu tour đã kết thúc
            if (booking.getBookingStatus() == BookingStatus.CONFIRMED && booking.getTour().getEndDate().isBefore(currentDate)) {
                booking.setBookingStatus(BookingStatus.COMPLETED);
                booking.setUpdatedAt(LocalDateTime.now());
                bookingRepository.save(booking);
            }
            Tour tour = booking.getTour();
            return BookingDTO.builder()
                    .bookingId(booking.getBookingId())
                    .title(tour.getTitle())
                    .userId(booking.getUser().getUserId())
                    .tourId(tour.getTourId())
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
                    .startDate(tour.getStartDate())
                    .endDate(tour.getEndDate())
                    .priceAdult(String.format("%,.0f VNĐ", tour.getPriceAdult())) // Chuyển sang Long
                    .priceChild(String.format("%,.0f VNĐ", tour.getPriceChild())) // Chuyển sang Long
                    .createdAt(booking.getCreatedAt())
                    .updatedAt(booking.getUpdatedAt())
                    .paymentMethod(paymentMethod)
                    .paymentStatus(paymentStatus != null ? paymentStatus.name() : null)
                    .build();
        }).collect(Collectors.toList());
    }

    @Override
    public boolean hasUserBookedTour(Long userId, Long tourId) {
        try {
            return bookingRepository.existsByUserUserIdAndTourTourId(userId, tourId);
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Optional<Booking> findById(Long id) throws DataNotFoundException {
        return Optional.of(bookingRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find booking with id: " + id)));
    }

    @Override
    public List<Booking> findBookingsByUserId(Long userId) {
        return bookingRepository.findByUserUserId(userId);
    }

    public Long countBookingsByTourId(Long tourId) {
        return bookingRepository.countBookingsByTourId(tourId);
    }



}