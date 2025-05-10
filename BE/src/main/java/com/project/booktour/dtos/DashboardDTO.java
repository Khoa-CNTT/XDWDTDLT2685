
package com.project.booktour.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {
    private Long activeTours;         // Số tour đang hoạt động
    private Long totalBookings;       // Tổng số lượt booking
    private Long totalUsers;          // Tổng số người dùng ký (active)
    private Double totalRevenue;      // Tổng doanh thu
}