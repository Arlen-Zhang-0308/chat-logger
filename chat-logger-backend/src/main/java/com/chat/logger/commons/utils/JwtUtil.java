package com.chat.logger.commons.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.chat.logger.controller.user.vo.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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
                .withClaim("username", user.getUsername())
                .withExpiresAt(expireDate)
                .sign(Algorithm.HMAC256(secret));
    }

    public String extractUsername(String token) {
        return JWT.decode(token).getClaim("username").asString();
    }

    public boolean validateToken(String token, User user) {
        String username = extractUsername(token);
        Date expirationDate = JWT.decode(token).getExpiresAt();
        Date currentDate = new Date();
        return username.equals(user.getUsername()) && currentDate.before(expirationDate);
    }
}
