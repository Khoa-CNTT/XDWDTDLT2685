package com.project.booktour.services.invoice;

import com.project.booktour.models.*;
import com.project.booktour.repositories.BookingRepository;
import com.project.booktour.repositories.InvoiceRepository;
import com.project.booktour.responses.invoice.InvoiceResponse;
import com.project.booktour.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InvoiceService implements IInvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final BookingRepository bookingRepository;
    private final EmailService emailService;

    private static final String INVOICE_UPLOAD_DIR = "uploads/invoices/";

    @Override
    public InvoiceResponse getOrCreateInvoice(Long bookingId) {
        // Kiểm tra booking tồn tại
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

        // Kiểm tra nếu invoice đã tồn tại thì trả về, nếu không thì tạo mới
        Invoice invoice = invoiceRepository.findByBookingId(bookingId)
                .orElseGet(() -> createNewInvoice(booking));

        return buildInvoiceResponse(booking, invoice);
    }


    @Override
    public String sendInvoiceToCustomer(Long bookingId, MultipartFile file) throws IOException {
        try {
            // Validate input
            if (bookingId == null) {
                throw new IllegalArgumentException("Booking ID cannot be null");
            }

            // Lấy thông tin booking
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));

            User user = booking.getUser();
            if (user == null || user.getEmail() == null || user.getEmail().isEmpty()) {
                throw new RuntimeException("User information or email is missing for booking: " + bookingId);
            }

            // Kiểm tra file đính kèm
            if (file != null && file.isEmpty()) {
                throw new IllegalArgumentException("File đính kèm rỗng");
            }

            // Tạo nội dung email
            String emailContent = buildEmailContent(booking);

            // Log dữ liệu để debug
            System.out.println("Sending email to: " + user.getEmail());
            System.out.println("Subject: Hóa đơn đặt tour #" + bookingId);
            System.out.println("Attachment: " + (file != null ? file.getOriginalFilename() : "None"));

            // Gửi email
            emailService.sendInvoiceEmail(
                    user.getEmail(),
                    "Hóa đơn đặt tour #" + bookingId,
                    emailContent,
                    file
            );

            return "Invoice sent successfully to " + user.getEmail();
        } catch (RuntimeException e) {
            e.printStackTrace();
            throw new IOException("Failed to send invoice: " + e.getMessage(), e);
        }
    }

    private Invoice createNewInvoice(Booking booking) {
        Tour tour = booking.getTour();
        if (tour == null) {
            throw new RuntimeException("Tour not found for booking");
        }

        List<Checkout> checkouts = booking.getCheckouts();
        Checkout checkout = checkouts != null && !checkouts.isEmpty() ? checkouts.get(0) : null;

        String details = buildInvoiceDetails(booking, tour, checkout);

        Invoice invoice = Invoice.builder()
                .booking(booking)
                .amount(booking.getTotalPrice())
                .invoiceDate(LocalDate.now())
                .details(details)
                .build();

        return invoiceRepository.save(invoice);
    }

    private String buildInvoiceDetails(Booking booking, Tour tour, Checkout checkout) {
        String fullName = booking.getUser() != null ?
                truncate(booking.getUser().getFullName(), 50) : "Unknown";
        String tourTitle = truncate(tour.getTitle(), 50);
        String transactionId = checkout != null ?
                truncate(checkout.getTransactionId(), 30) : "N/A";
        String paymentStatus = checkout != null ?
                checkout.getPaymentStatus().name() : "N/A";

        String details = String.format(
                "Customer: %s, Tour: %s, Total: %.2f, PayStatus: %s, TxID: %s",
                fullName, tourTitle, booking.getTotalPrice(), paymentStatus, transactionId
        );

        return truncate(details, 255);
    }

    private InvoiceResponse buildInvoiceResponse(Booking booking, Invoice invoice) {
        Tour tour = booking.getTour();
        Checkout checkout = booking.getCheckouts() != null && !booking.getCheckouts().isEmpty() ?
                booking.getCheckouts().get(0) : null;

        return InvoiceResponse.builder()
                .bookingId(booking.getBookingId())
                .numAdults(booking.getNumAdults())
                .numChildren(booking.getNumChildren())
                .priceAdults(String.format("%,.0f VNĐ", tour.getPriceAdult()))
                .priceChild(String.format("%,.0f VNĐ", tour.getPriceAdult()))
                .totalPrice(String.format("%,.0f VNĐ",booking.getTotalPrice()))
                .fullName(booking.getUser() != null ? booking.getUser().getFullName() : null)
                .address(booking.getUser() != null ? booking.getUser().getAddress() : null)
                .phoneNumber(booking.getUser() != null ? booking.getUser().getPhoneNumber() : null)
                .email(booking.getUser() != null ? booking.getUser().getEmail() : null)
                .createdAt(invoice.getCreatedAt())
                .bookingStatus(booking.getBookingStatus().name())
                .paymentMethod(checkout != null ? checkout.getPaymentMethod() : null)
                .paymentStatus(checkout != null ? checkout.getPaymentStatus().name() : null)
                .transactionId(checkout != null ? checkout.getTransactionId() : null)
                .updatedAt(invoice.getUpdatedAt())
                .tax(0.0) // Có thể tính toán thực tế
                .discount(booking.getPromotion() != null ? booking.getPromotion().getDiscount() : 0.0)
                .title(tour != null ? tour.getTitle() : null)
                .specialRequests(booking.getSpecialRequests())
                .formattedTourId(tour != null ? tour.getTourId().toString() : null)
                .userId(booking.getUser() != null ? booking.getUser().getUserId() : null)
                .promotionId(booking.getPromotion() != null ? booking.getPromotion().getPromotionId() : null)
                .build();
    }

    private File saveUploadedFile(MultipartFile file) throws IOException {
        // Tạo thư mục nếu chưa tồn tại
        Path uploadPath = Paths.get(INVOICE_UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Tạo tên file duy nhất
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        return filePath.toFile();
    }

    private String buildEmailContent(Booking booking) {
        User user = booking.getUser();
        return "<h3>Xin chào " + (user != null ? user.getFullName() : "Quý khách") + ",</h3>" +
                "<p>Cảm ơn bạn đã đặt tour với chúng tôi. Dưới đây là thông tin hóa đơn của bạn:</p>" ;
    }

    private String truncate(String value, int length) {
        if (value == null) return null;
        return value.length() > length ? value.substring(0, length) : value;
    }
}