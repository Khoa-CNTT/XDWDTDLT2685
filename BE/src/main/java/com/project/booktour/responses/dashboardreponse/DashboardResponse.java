package com.project.booktour.responses.dashboardreponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {
    private Long activeTours;         // Số tour đang hoạt động
    private Long totalBookings;       // Tổng số lượt booking
    private Long totalUsers;          // Tổng số người dùng ký (active)
    private Double totalRevenue;      // Tổng doanh thu
    private List<RegionBookingResponse> regionBookings; // Số lượt đặt theo miền
    private List<PaymentMethodResponse> paymentMethods;
    private List<TourStatsResponse> tourStats; // Thống kê tour
    private List<BookingStatsResponse> latestBookings; // Thêm danh sách 5 booking mới nhất
    private List<MonthlyRevenueResponse> monthlyRevenues;
}