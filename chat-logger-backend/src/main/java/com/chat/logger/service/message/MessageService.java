package com.chat.logger.service.message;

import com.chat.logger.controller.message.vo.Message;
import com.chat.logger.mongodb.MessageRepository;
import org.bson.types.ObjectId;
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

    public List<Message> getMessagesByUser(ObjectId uid) {
        return messageRepository.findByUser(uid);
    }

    public Message insertMessage(Message message) {
        return messageRepository.insert(message);
    }

    public Message updateMessage(Message message) {
        Message savedMessage = messageRepository.findById(message.getId()).orElse(null);
        String newMsg = message.getMessage();
        if(savedMessage != null) {
            savedMessage.setMessage(newMsg);
            return messageRepository.save(savedMessage);
        }
        return null;
    }
}
