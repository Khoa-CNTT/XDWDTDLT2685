package com.project.booktour.services.booking;

import com.project.booktour.dtos.BookingDTO;
import com.project.booktour.exceptions.DataNotFoundException;
import com.project.booktour.models.Booking;
import com.project.booktour.models.User;
import com.project.booktour.repositories.BookingRepository;
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
    private final BookingRepository bookingRepository;
    private final ModelMapper modelMapper;

    @Override
    public Booking createBooking(BookingDTO bookingDTO) throws Exception {
        Booking booking = new Booking();
        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + bookingDTO.getUserId()));

        // Tạo một luồng ánh xạ riêng để bỏ qua việc set ID
        modelMapper.typeMap(BookingDTO.class, Booking.class)
                .addMappings(mapper -> mapper.skip(Booking::setBookingId));

        // Cập nhật các trường của booking từ bookingDTO
        modelMapper.map(bookingDTO, booking);

        booking.setUser(user);
        booking.setBookingDate(LocalDate.now()); // Lấy ngày hiện tại
        // Nếu bạn có enum BookingStatus, thay thế bằng cách thích hợp
        // Ví dụ: booking.setBookingStatus(BookingStatus.PENDING);
        booking.setBookingStatus("pending"); // Giả định bookingStatus là String trong database
        LocalDate bookingDate = bookingDTO.getBookingDate() == null ? LocalDate.now() : bookingDTO.getBookingDate();

        // Kiểm tra bookingDate phải >= ngày hôm nay
        if (bookingDate.isBefore(LocalDate.now())) {
            throw new DataNotFoundException("Booking date must be at least today!");
        }
        booking.setBookingDate(bookingDate);
        bookingRepository.save(booking);
        return booking;
    }

    @Override
    public Booking getBooking(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @Override
    public Booking updateBooking(Long id, BookingDTO bookingDTO) throws DataNotFoundException {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find booking with id: " + id));
        User existingUser = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new DataNotFoundException("Cannot find user with id: " + bookingDTO.getUserId()));

        // Tạo một luồng ánh xạ riêng để bỏ qua việc set ID
        modelMapper.typeMap(BookingDTO.class, Booking.class)
                .addMappings(mapper -> mapper.skip(Booking::setBookingId));

        // Cập nhật các trường của booking từ bookingDTO
        modelMapper.map(bookingDTO, booking);
        booking.setUser(existingUser);
        return bookingRepository.save(booking);
    }

    @Override
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        // Không xóa cứng, thực hiện soft-delete
        if (booking != null) {
            // Trong database không có cột `active`, bạn có thể cần thêm logic khác
            // Ví dụ: thay đổi bookingStatus thành "cancelled"
            booking.setBookingStatus("cancelled");
            bookingRepository.save(booking);
        }
    }

    @Override
    public List<Booking> findByUserId(Long userId) {
        return bookingRepository.findByUserUserId(userId);
    }
}