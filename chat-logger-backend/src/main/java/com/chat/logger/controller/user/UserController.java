package com.chat.logger.controller.user;

import com.chat.logger.commons.http.Result;
import com.chat.logger.commons.utils.JwtUtil;
import com.chat.logger.commons.utils.MailUtil;
import com.chat.logger.commons.utils.PasswordUtil;
import com.chat.logger.controller.user.vo.User;
import com.chat.logger.service.user.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private MailUtil mailUtil;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @PostMapping("/send-verify")
    public Result sendVerify(@RequestParam String email) {
        User savedUser = userService.getUserByEmail(email);

        // Judge if the email is used.
        if(savedUser != null) {
            return Result.err("The email is used. Please register with another email.");
        }

        // Send verification code and store it into redis.
        String veriCode = mailUtil.sendVeriCode(email);
        redisTemplate.opsForValue().set(email, veriCode, Duration.ofMinutes(10));

        return Result.ok(String.format("Verification code has been sent to %s. Please enter it and submit in 10 minutes.", email));
    }

    @PostMapping("/register")
    public Result register(@RequestBody User user, @RequestParam String code) {
        String email = user.getEmail();

        // Code is expired or was not stored.
        String savedCode = redisTemplate.opsForValue().get(email);
        if(savedCode == null || !savedCode.equals(code)) {
            return Result.err("Verification code is incorrect or expired.");
        }

        // Expected result
        String encryptedPassword = PasswordUtil.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        if(userService.createUser(user) != null) {
            return Result.ok("Successfully registered!");
        }
        return Result.err("Failed to register.");
    }

    @PostMapping("/login")
    public Result login(@RequestBody User user) {
        if(user == null) return Result.err("Invalid user.");

        String email = user.getEmail();
        User savedUser = userService.getUserByEmail(email);

        if(savedUser == null) return Result.err("User not found.");

        String userPassword = user.getPassword();
        String savedPassword = savedUser.getPassword();

        if(PasswordUtil.matches(userPassword, savedPassword)) {
            String token = jwtUtil.generateToken(savedUser);

            return new Result(savedUser.getEmail(), token);
        }
        return Result.err("Incorrect password.");
    }
}
