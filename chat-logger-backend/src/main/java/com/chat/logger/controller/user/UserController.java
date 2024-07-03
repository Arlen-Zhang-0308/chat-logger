package com.chat.logger.controller.user;

import com.chat.logger.commons.Result;
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

    @GetMapping("")
    public User getUserById(@RequestParam ObjectId uid) {
        return userService.getUserById(uid);
    }

    @PostMapping("/register")
    public Result register(@RequestBody User user) {
        if(userService.createUser(user) != null) {
            System.out.printf("%s\t%s\t%s\n", user.getUsername(), user.getEmail(), user.getPassword());
            return Result.ok();
        }
        else {
            return Result.err("Error on register.");
        }
    }

    @PostMapping("/login")
    public Result login(@RequestBody User user) {
        if(userService.createUser(user) != null) {
            System.out.printf("%s\t%s\n", user.getUsername(), user.getPassword());
            return Result.ok();
        }
        else {
            return Result.err("Error on login.");
        }
    }
}
