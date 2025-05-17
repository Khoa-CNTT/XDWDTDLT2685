package com.project.booktour.controllers;

import com.project.booktour.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/test-mail")
@RequiredArgsConstructor
public class TestMailController {

    private final EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendTestEmail(@RequestParam("to") String to) {
        try {
            String subject = "Test Email from Spring Boot";
            String content = "<h2>This is a test email</h2><p>Gửi từ hệ thống BookTour.</p>";

            // Gửi email không đính kèm file
            emailService.sendInvoiceEmail(to, subject, content, null);
            return ResponseEntity.ok("Đã gửi email test đến: " + to);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Lỗi gửi email: " + e.getMessage());
        }
    }
}
