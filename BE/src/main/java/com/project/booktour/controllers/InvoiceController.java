package com.project.booktour.controllers;

import com.project.booktour.responses.invoice.InvoiceResponse;
import com.project.booktour.services.invoice.IInvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("${api.prefix}/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final IInvoiceService invoiceService;

    @GetMapping("")
    public ResponseEntity<InvoiceResponse> getOrCreateInvoice(
            @RequestParam("bookingId") Long bookingId) {
        InvoiceResponse response = invoiceService.getOrCreateInvoice(bookingId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendInvoiceToCustomer(
            @RequestParam("bookingId") Long bookingId,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        String result = invoiceService.sendInvoiceToCustomer(bookingId, file);
        return ResponseEntity.ok(result);
    }
}