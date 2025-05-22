package com.project.booktour.services;

import com.project.booktour.models.*;
import com.project.booktour.repositories.BookingRepository;
import com.project.booktour.repositories.CheckoutRepository;
import com.project.booktour.repositories.TourRepository;
import com.project.booktour.repositories.UserRepository;
import com.project.booktour.responses.dashboardreponse.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    private final BookingRepository bookingRepository;
    private final CheckoutRepository checkoutRepository;

    public DashboardResponse getDashboardStats() {
        Long activeTours = tourRepository.countByAvailabilityTrue() != null ? tourRepository.countByAvailabilityTrue() : 0L;
        Long totalBookings = bookingRepository.count();
        Long totalUsers = userRepository.countActiveUsers() != null ? userRepository.countActiveUsers() : 0L;
        Double totalRevenue = calculateTotalRevenue() != null ? calculateTotalRevenue() : 0.0;

        List<RegionBookingResponse> regionBookings = getRegionBookings();
        List<PaymentMethodResponse> paymentMethods = getPaymentMethods();
        List<TourStatsResponse> tourStats = getTourStats().stream().limit(5).toList();
        List<BookingStatsResponse> latestBookings = getLatestBookings();
        List<MonthlyRevenueResponse> monthlyRevenues = getMonthlyRevenues();

        return new DashboardResponse(activeTours, totalBookings, totalUsers, totalRevenue, regionBookings, paymentMethods, tourStats, latestBookings, monthlyRevenues);
    }

    private Double calculateTotalRevenue() {
        List<Checkout> checkouts = checkoutRepository.findAll();
        return checkouts.stream()
                .filter(checkout -> checkout.getPaymentStatus() != null && checkout.getPaymentStatus() == PaymentStatus.COMPLETED)
                .mapToDouble(Checkout::getAmount)
                .sum();
    }

    private List<RegionBookingResponse> getRegionBookings() {
        List<Object[]> bookingCounts = bookingRepository.countBookingsByRegion();

        // Khởi tạo Map để lưu trữ số lượng booking theo vùng
        Map<String, Long> regionMap = new HashMap<>();
        regionMap.put("Miền Bắc", 0L);
        regionMap.put("Miền Trung", 0L);
        regionMap.put("Miền Nam", 0L);

        // Cập nhật số lượng booking từ kết quả truy vấn
        for (Object[] result : bookingCounts) {
            Region region = (Region) result[0];
            Long count = (Long) result[1];
            if (region != null && count != null) {
                switch (region) {
                    case NORTH:
                        regionMap.put("Miền Bắc", count);
                        break;
                    case CENTRAL:
                        regionMap.put("Miền Trung", count);
                        break;
                    case SOUTH:
                        regionMap.put("Miền Nam", count);
                        break;
                }
            }
        }

        // Chuyển Map thành List<RegionBookingResponse>
        return regionMap.entrySet().stream()
                .map(entry -> new RegionBookingResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    private List<PaymentMethodResponse> getPaymentMethods() {
        List<Checkout> checkouts = checkoutRepository.findAll();
        List<PaymentMethodResponse> paymentMethods = new ArrayList<>();

        // Tính tổng số checkout đã hoàn thành
        long totalCompletedCheckouts = checkouts.stream()
                .filter(checkout -> checkout.getPaymentStatus() != null && checkout.getPaymentStatus() == PaymentStatus.COMPLETED)
                .count();

        // Đếm số checkout cho từng phương thức thanh toán
        long vnpayCount = checkouts.stream()
                .filter(c -> c.getPaymentMethod() != null && "VNPAY".equalsIgnoreCase(c.getPaymentMethod()) && c.getPaymentStatus() == PaymentStatus.COMPLETED)
                .count();
        long officeCount = checkouts.stream()
                .filter(c -> c.getPaymentMethod() != null && "OFFICE".equalsIgnoreCase(c.getPaymentMethod()) && c.getPaymentStatus() == PaymentStatus.COMPLETED)
                .count();

        // Tính tỷ lệ phần trăm
        double vnpayPercentage = totalCompletedCheckouts > 0 ? (vnpayCount * 100.0) / totalCompletedCheckouts : 0.0;
        double officePercentage = totalCompletedCheckouts > 0 ? (officeCount * 100.0) / totalCompletedCheckouts : 0.0;

        paymentMethods.add(new PaymentMethodResponse("VNPAY", vnpayPercentage));
        paymentMethods.add(new PaymentMethodResponse("Thanh toán tại văn phòng", officePercentage));

        return paymentMethods;
    }

    private List<TourStatsResponse> getTourStats() {
        List<Tour> tours = tourRepository.findAll();
        List<TourStatsResponse> tourStats = new ArrayList<>();

        for (Tour tour : tours) {
            List<Booking> confirmedBookings = bookingRepository.findByTourAndBookingStatus(
                    tour.getTourId(), BookingStatus.CONFIRMED);

            // Tổng số người (người lớn + trẻ em)
            Long bookedSlots = confirmedBookings.stream()
                    .mapToLong(booking -> {
                        int adults = booking.getNumAdults() != null ? booking.getNumAdults() : 0;
                        int children = booking.getNumChildren() != null ? booking.getNumChildren() : 0;
                        return adults + children;
                    })
                    .sum();

            // Số lượng booking
            int bookingCount = confirmedBookings.size();

            // Số slot còn lại
            Integer availableSlots = tour.getQuantity() != null
                    ? (tour.getQuantity() - bookedSlots.intValue())
                    : 0;

            // Điểm trung bình
            Double averageRating = tour.getReviews() != null && !tour.getReviews().isEmpty()
                    ? tour.getReviews().stream()
                    .mapToDouble(review -> review.getRating() != null ? review.getRating() : 0.0)
                    .average()
                    .orElse(0.0)
                    : 0.0;

            // Tạo DTO
            TourStatsResponse tourStat = new TourStatsResponse(
                    "tour" + String.format("%03d", tour.getTourId()),
                    tour.getTitle(),
                    bookedSlots.intValue(),
                    availableSlots,
                    tour.getPriceAdult(),
                    Math.round(averageRating * 10.0) / 10.0,
                    tour.getDuration(),
                    bookingCount // 👈 thêm vào đây
            );
            tourStats.add(tourStat);
        }

        // Trả về top 5 theo số người đặt nhiều nhất
        return tourStats.stream()
                .sorted((t1, t2) -> Integer.compare(t2.getBookedSlots(), t1.getBookedSlots()))
                .limit(5)
                .collect(Collectors.toList());
    }


    private List<BookingStatsResponse> getLatestBookings() {
        List<Booking> bookings = bookingRepository.findTop5ByOrderByCreatedAtDesc();
        List<BookingStatsResponse> latestBookings = new ArrayList<>();

        for (Booking booking : bookings) {
            String regionStr;
            switch (booking.getTour().getRegion()) {
                case NORTH:
                    regionStr = "Miền Bắc";
                    break;
                case CENTRAL:
                    regionStr = "Miền Trung";
                    break;
                case SOUTH:
                    regionStr = "Miền Nam";
                    break;
                default:
                    regionStr = "Không xác định";
            }

            Checkout checkout = checkoutRepository.findByBookingBookingId(booking.getBookingId()).orElse(null);
            String paymentMethod = checkout != null && checkout.getPaymentMethod() != null ? checkout.getPaymentMethod() : "Không xác định";
            String status = booking.getBookingStatus() != null ? booking.getBookingStatus().toString() : "PENDING";

            BookingStatsResponse bookingStat = new BookingStatsResponse(
                    "booking" + String.format("%03d", booking.getBookingId()),
                    booking.getUser().getUsername(),
                    booking.getTour().getTitle(),
                    booking.getTotalPrice(),
                    status,
                    paymentMethod,
                    regionStr,
                    booking.getCreatedAt() != null ? booking.getCreatedAt().toString() : ""
            );
            latestBookings.add(bookingStat);
        }

        return latestBookings;
    }

    private List<MonthlyRevenueResponse> getMonthlyRevenues() {
        List<Checkout> checkouts = checkoutRepository.findAll();

        // Nhóm doanh thu từ Checkout theo tháng
        Map<String, Double> revenueByMonthFromCheckout = checkouts.stream()
                .filter(checkout -> checkout.getPaymentStatus() != null && checkout.getPaymentStatus() == PaymentStatus.COMPLETED)
                .filter(checkout -> checkout.getPaymentDate() != null)
                .collect(Collectors.groupingBy(
                        checkout -> checkout.getPaymentDate().format(DateTimeFormatter.ofPattern("MM-yyyy")),
                        Collectors.summingDouble(Checkout::getAmount)
                ));


        // Lấy danh sách 12 tháng của năm hiện tại (2025)
        LocalDate currentDate = LocalDate.now(); // 2025-05-14
        int currentYear = currentDate.getYear();
        List<MonthlyRevenueResponse> monthlyRevenues = new ArrayList<>();
        for (int month = 1; month <= 12; month++) {
            String monthYear = String.format("%02d-%d", month, currentYear); // Ví dụ: "01-2025", "02-2025", ...
            Double revenue = revenueByMonthFromCheckout.getOrDefault(monthYear, 0.0); // Lấy doanh thu, mặc định là 0.0 nếu không có
            monthlyRevenues.add(new MonthlyRevenueResponse(monthYear, revenue));
        }

        // Chuyển đổi tên tháng sang tiếng Anh để khớp với biểu đồ
        Map<String, String> monthMap = new HashMap<>();
        monthMap.put("01", "January");
        monthMap.put("02", "February");
        monthMap.put("03", "March");
        monthMap.put("04", "April");
        monthMap.put("05", "May");
        monthMap.put("06", "June");
        monthMap.put("07", "July");
        monthMap.put("08", "August");
        monthMap.put("09", "September");
        monthMap.put("10", "October");
        monthMap.put("11", "November");
        monthMap.put("12", "December");

        return monthlyRevenues.stream()
                .map(dto -> {
                    String[] parts = dto.getMonthYear().split("-");
                    String monthName = monthMap.get(parts[0]);
                    return new MonthlyRevenueResponse(monthName, dto.getRevenue());
                })
                .collect(Collectors.toList());
    }
}