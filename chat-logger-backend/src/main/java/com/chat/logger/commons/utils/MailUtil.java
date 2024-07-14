package com.chat.logger.commons.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

@Component
public class MailUtil {
    @Value("${spring.mail.username}")
    private String senderEmail;

    @Autowired
    private JavaMailSender javaMailSender;

    public boolean sendContent(String recipientEmail, String subject, String content) {
        System.out.printf("Sender: %s\n", senderEmail);
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            mailMessage.setFrom(senderEmail);
            mailMessage.setTo(recipientEmail);
            mailMessage.setSubject(subject);
            mailMessage.setText(content);

            javaMailSender.send(mailMessage);
            return true;
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public String sendVeriCode(String recipientEmail) {
        int num = (int) (Math.random()*10000);
        String veriCode;

        System.out.printf("Verify code: %d\n", num);
        if(num < 1000) {
            veriCode = String.format("0%d", num);
        }
        else {
            veriCode = String.valueOf(num);
        }

        String subject = "Chat Logger verification code";
        String mailContent = String.format("Your verification code is: %s", veriCode);

        if(sendContent(recipientEmail, subject, mailContent)) {
            return veriCode;
        }
        return "Failed to send verification code.";
    }
}
