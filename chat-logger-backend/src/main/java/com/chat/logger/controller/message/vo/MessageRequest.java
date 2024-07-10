package com.chat.logger.controller.message.vo;

import lombok.Data;
import org.bson.types.ObjectId;

import java.util.List;

@Data
public class MessageRequest {
    List<Message> messageList;
    int listNumber;
    String userId;
}
