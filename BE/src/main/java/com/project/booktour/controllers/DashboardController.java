
package com.project.booktour.controllers;

import com.project.booktour.dtos.DashboardDTO;
import com.project.booktour.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')") // Chỉ admin mới truy cập được
    public ResponseEntity<DashboardDTO> getDashboardStats() {
        try {
            DashboardDTO stats = dashboardService.getDashboardStats();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new DashboardDTO(0L, 0L, 0L, 0.0));
        }
    }
}