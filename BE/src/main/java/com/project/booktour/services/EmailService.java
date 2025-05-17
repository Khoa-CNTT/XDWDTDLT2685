package com.project.booktour.services;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.File;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendInvoiceEmail(String to, String subject, String content, File attachment) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(content, true); // true indicates HTML

        // Đính kèm file nếu có
        if (attachment != null && attachment.exists()) {
            helper.addAttachment(attachment.getName(), attachment);
        }

        mailSender.send(message);

        // Xóa file tạm sau khi gửi
        if (attachment != null) {
            attachment.delete();
        }
    }

    public void sendResetCodeEmail(String to, String subject, String resetCode) throws MessagingException {
        String content = "<h3>Mã xác nhận đặt lại mật khẩu</h3>" +
                "<p>Mã xác nhận của bạn là: <strong>" + resetCode + "</strong></p>" +
                "<p>Mã này có hiệu lực trong 10 phút. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>" +
                "<p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>";

        sendInvoiceEmail(to, subject, content, null);
    }
}