package com.project.booktour.services;

import com.project.booktour.dtos.DashboardDTO;
import com.project.booktour.dtos.PaymentMethodDTO;
import com.project.booktour.dtos.RegionBookingDTO;
import com.project.booktour.models.Region;
import com.project.booktour.repositories.BookingRepository;
import com.project.booktour.repositories.CheckoutRepository;
import com.project.booktour.repositories.TourRepository;
import com.project.booktour.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final TourRepository tourRepository;
    private final BookingRepository bookingRepository;
    private final CheckoutRepository checkoutRepository;

    public DashboardDTO getDashboardStats() {
        Long activeTours = tourRepository.countByAvailabilityTrue() != null ? tourRepository.countByAvailabilityTrue() : 0L;
        Long totalBookings = bookingRepository.countTotalBookings() != null ? bookingRepository.countTotalBookings() : 0L;
        Long totalUsers = userRepository.countActiveUsers() != null ? userRepository.countActiveUsers() : 0L;
        Double totalRevenue = bookingRepository.sumTotalRevenue() != null ? bookingRepository.sumTotalRevenue() : 0.0;

        // Lấy số lượt đặt theo vùng
        List<RegionBookingDTO> regionBookings = getRegionBookings();

        // Lấy tỷ lệ phương thức thanh toán
        List<PaymentMethodDTO> paymentMethods = getPaymentMethods();

        return new DashboardDTO(activeTours, totalBookings, totalUsers, totalRevenue, regionBookings, paymentMethods);
    }

    private List<RegionBookingDTO> getRegionBookings() {
        List<Object[]> bookingCounts = bookingRepository.countBookingsByRegion();
        List<RegionBookingDTO> regionBookings = new ArrayList<>();

        // Khởi tạo giá trị mặc định cho cả 3 miền
        regionBookings.add(new RegionBookingDTO("Miền Bắc", 0L));
        regionBookings.add(new RegionBookingDTO("Miền Trung", 0L));
        regionBookings.add(new RegionBookingDTO("Miền Nam", 0L));

        // Cập nhật số lượt đặt từ kết quả truy vấn
        for (Object[] result : bookingCounts) {
            Region region = (Region) result[0];
            Long count = (Long) result[1];

            switch (region) {
                case NORTH:
                    regionBookings.set(0, new RegionBookingDTO("Miền Bắc", count));
                    break;
                case CENTRAL:
                    regionBookings.set(1, new RegionBookingDTO("Miền Trung", count));
                    break;
                case SOUTH:
                    regionBookings.set(2, new RegionBookingDTO("Miền Nam", count));
                    break;
            }
        }

        return regionBookings;
    }

    private List<PaymentMethodDTO> getPaymentMethods() {
        List<Object[]> paymentCounts = checkoutRepository.countBookingsByPaymentMethod();
        List<PaymentMethodDTO> paymentMethods = new ArrayList<>();

        // Lấy tổng số booking từ bookingRepository
        long totalBookings = bookingRepository.countTotalBookings() != null ? bookingRepository.countTotalBookings() : 0;

        // Khởi tạo giá trị mặc định cho các phương thức thanh toán
        paymentMethods.add(new PaymentMethodDTO("VNPAY", 0.0));
        paymentMethods.add(new PaymentMethodDTO("Thanh toán tại văn phòng", 0.0));

        // Cập nhật số lượng giao dịch cho từng phương thức
        for (Object[] result : paymentCounts) {
            String paymentMethod = (String) result[0];
            Long count = (Long) result[1];
            double percentage = totalBookings > 0 ? (count * 100.0) / totalBookings : 0.0;

            if ("VNPAY".equalsIgnoreCase(paymentMethod)) {
                paymentMethods.set(0, new PaymentMethodDTO("VNPAY", percentage));
            } else if ("OFFICE".equalsIgnoreCase(paymentMethod)) { // Sửa để khớp với dữ liệu thực tế
                paymentMethods.set(1, new PaymentMethodDTO("Thanh toán tại văn phòng", percentage));
            }
        }

        return paymentMethods;
    }
}