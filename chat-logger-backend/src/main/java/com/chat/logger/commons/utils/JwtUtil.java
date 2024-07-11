package com.chat.logger.commons.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.chat.logger.controller.user.vo.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(User user) {
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + expiration);

        return JWT.create()
                .withClaim("email", user.getEmail())
                .withExpiresAt(expireDate)
                .sign(Algorithm.HMAC256(secret));
    }

    public String extractEmail(String token) {
        String email = JWT.decode(token).getClaim("email").asString();
        return email;
    }

    public boolean validateToken(String token, String email) {
        String username = extractEmail(token);
        Date expirationDate = JWT.decode(token).getExpiresAt();
        Date currentDate = new Date();
        return username.equals(email) && currentDate.before(expirationDate);
    }
}
