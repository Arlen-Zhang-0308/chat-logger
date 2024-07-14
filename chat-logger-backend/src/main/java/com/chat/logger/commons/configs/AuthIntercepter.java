package com.chat.logger.commons.configs;

import com.chat.logger.commons.utils.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.lang.Nullable;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class AuthIntercepter implements HandlerInterceptor {

    private final JwtUtil jwtUtil = new JwtUtil();
    @Override
    public boolean preHandle(@NonNull HttpServletRequest request,
                             @NonNull HttpServletResponse response,
                             @NonNull Object handler) throws Exception {

        if(request.getMethod().equalsIgnoreCase("OPTIONS")) return true;
        System.out.printf("Url: %s\n", request.getRequestURL());
        String token = request.getHeader("Authorization");
        if(token == null) {
            System.out.println("User is not logged in.");
            response.sendError(401, "User is not logged in.");
            return false;
        }
        String email = jwtUtil.extractEmail(token);
        boolean validated = jwtUtil.validateToken(token, email);
        if(!validated) {
            System.out.println("User authentication is expired.");
            response.sendError(401, "User authentication is expired.");
            return false;
        }
        return true;
    }

    @Override
    public void postHandle(@NonNull HttpServletRequest request,
                              @NonNull HttpServletResponse response,
                              @NonNull Object handler,
                              @Nullable ModelAndView modelAndView) throws Exception {
        System.out.printf("Authenticated: %s\n", request.getHeader("Authorization"));
    }
}
