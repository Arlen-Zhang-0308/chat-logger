package com.chat.logger.controller.message;

import com.chat.logger.controller.Result;
import com.chat.logger.controller.message.vo.Message;
import com.chat.logger.controller.message.vo.MessageRequest;
import com.chat.logger.service.message.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/message")
public class MessageController {
    @Autowired
    MessageService messageService;

    @GetMapping("/message")
    public List<Message> getAllMessage() {
        return messageService.getAllMessages();
    }

    @PostMapping("/message")
    public Result insertMessage(@RequestBody MessageRequest messageRequest) {
        List<Message> messages = messageRequest.getMessageList();
        for (Message message : messages) {
            System.out.println(message.getMessage());
            messageService.insertMessage(message);
        }
        return new Result("ok", "success");
    }
}
