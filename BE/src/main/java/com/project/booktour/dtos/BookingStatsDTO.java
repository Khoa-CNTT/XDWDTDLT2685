package com.project.booktour.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingStatsDTO {
    private String bookingId;        // ID đặt tour
    private String customerName;     // Tên khách hàng
    private String tourName;         // Tên tour
    private Double price;            // Giá (VND)
    private String status;           // Trạng thái
    private String paymentMethod;    // Phương thức thanh toán
    private String region;           // Miền (lấy từ tour)
    private String bookingDate;      // Ngày đặt
}