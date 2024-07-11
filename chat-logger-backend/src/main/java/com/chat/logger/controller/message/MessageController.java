package com.chat.logger.controller.message;

import com.chat.logger.commons.http.Result;
import com.chat.logger.commons.utils.JwtUtil;
import com.chat.logger.controller.message.vo.Message;
import com.chat.logger.controller.message.vo.MessageRequest;
import com.chat.logger.controller.user.vo.User;
import com.chat.logger.service.message.MessageService;
import com.chat.logger.service.user.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/message")
public class MessageController {
    @Autowired
    MessageService messageService;
    @Autowired
    UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("")
    public List<Message> getMessagesByUser(@RequestHeader("Authorization") String token) {
        String email = jwtUtil.extractEmail(token);
        if(email == null) {
            return null;
        }
        User savedUser = userService.getUserByEmail(email);
        ObjectId uid = savedUser.getId();
        return messageService.getMessagesByUser(uid);
    }

    @PostMapping("")
    public Result insertMessage(@RequestBody MessageRequest messageRequest, @RequestHeader("Authorization") String token) {
        String email = jwtUtil.extractEmail(token);
        User savedUser = userService.getUserByEmail(email);
        if(email == null) {
            return Result.err("Not logged in.");
        }
        List<Message> messages = messageRequest.getMessageList();
        List<Message> returnMsgs  = new ArrayList<>();
        for (Message message : messages) {
            message.setUserId(savedUser.getId());
            returnMsgs.add(messageService.insertMessage(message));
        }
        return Result.ok(returnMsgs.toString());
    }
}
