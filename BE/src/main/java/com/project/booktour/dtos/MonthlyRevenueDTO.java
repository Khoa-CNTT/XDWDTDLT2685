package com.project.booktour.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyRevenueDTO {
    private String monthYear; // Định dạng "MM-yyyy", ví dụ "05-2025"
    private Double revenue;   // Doanh thu của tháng
}