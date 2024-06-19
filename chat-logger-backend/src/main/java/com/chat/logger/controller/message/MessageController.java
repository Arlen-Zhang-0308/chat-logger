package com.chat.logger.controller.message;

import com.chat.logger.controller.message.vo.Message;
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

    @GetMapping("/messages")
    public List<Message> getAllMessage() {
        return messageService.getAllMessages();
    }

    @PostMapping("/messages")
    public Message insertMessage(@RequestBody Message message) {
        System.out.println(message.getMessage());
        return messageService.insertMessage(message);
    }
}
