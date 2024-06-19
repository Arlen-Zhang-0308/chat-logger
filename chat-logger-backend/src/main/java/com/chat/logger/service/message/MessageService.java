package com.chat.logger.service.message;

import com.chat.logger.controller.message.vo.Message;
import com.chat.logger.mongodb.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Message insertMessage(Message message) {
        return messageRepository.insert(message);
    }

    public Message updateMessage(Message message) {
        List<Message> savedMessages = messageRepository.findByTime(message.getTime());
        Message savedMessage = savedMessages.get(0);
        savedMessage.setMessage(message.getMessage());
        return messageRepository.save(savedMessage);
    }
}
