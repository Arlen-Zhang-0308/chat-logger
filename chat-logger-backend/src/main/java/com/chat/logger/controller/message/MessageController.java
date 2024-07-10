package com.chat.logger.controller.message;

import com.chat.logger.commons.http.Result;
import com.chat.logger.controller.message.vo.Message;
import com.chat.logger.controller.message.vo.MessageRequest;
import com.chat.logger.service.message.MessageService;
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

    @GetMapping("")
    public List<Message> getMessagesByUser(@RequestParam String userId) {
        if(!Objects.equals(userId, "") && userId != null) {
            ObjectId uid = new ObjectId(userId);
            return messageService.getMessagesByUser(uid);
        }
        else {
            return messageService.getAllMessages();
        }
    }

    @PostMapping("")
    public Result insertMessage(@RequestBody MessageRequest messageRequest) {
        List<Message> messages = messageRequest.getMessageList();
        List<Message> returnMsgs  = new ArrayList<>();
        for (Message message : messages) {
            System.out.println(message.getMessage());
            returnMsgs.add(messageService.insertMessage(message));
        }
        return Result.ok(returnMsgs.toString());
    }
}
