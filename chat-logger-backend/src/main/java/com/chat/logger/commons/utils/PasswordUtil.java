package com.chat.logger.commons.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordUtil {
    private static PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static String encode(String plainText) {
        return passwordEncoder.encode(plainText);
    }

    public static boolean matches(String plainText, String encryptedText) {
        return passwordEncoder.matches(plainText, encryptedText);
    }
}
