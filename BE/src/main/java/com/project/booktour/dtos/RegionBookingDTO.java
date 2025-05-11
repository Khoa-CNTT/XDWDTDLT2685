// com.project.booktour.dtos.RegionBookingDTO.java
package com.project.booktour.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegionBookingDTO {
    private String name;  // Tên miền: "Miền Bắc", "Miền Trung", "Miền Nam"
    private Long value;  // Số lượt đặt
}