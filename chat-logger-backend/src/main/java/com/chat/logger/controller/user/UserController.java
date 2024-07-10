package com.chat.logger.controller.user;

import com.chat.logger.commons.http.Result;
import com.chat.logger.commons.utils.JwtUtil;
import com.chat.logger.controller.user.vo.User;
import com.chat.logger.service.user.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public Result register(@RequestBody User user) {
        User savedUser = userService.getUserByEmail(user.getEmail());
        if(savedUser != null) {
            return Result.err("The email is registered. Please use another email.");
        }
        if(userService.createUser(user) != null) {
            return Result.ok();
        }
        return Result.err("Error on register.");
    }

    @PostMapping("/login")
    public Result login(@RequestBody User user) {
        if(user != null) {
            String email = user.getEmail();
            User savedUser = userService.getUserByEmail(email);
            if(user.getPassword().equals(savedUser.getPassword())) {
                String token = jwtUtil.generateToken(savedUser);

                return Result.ok(token);
            }
            return Result.err("Incorrect password.");
        }
        return Result.err("User not found.");
    }
}
