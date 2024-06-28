package com.chat.logger.controller.message.vo;

import lombok.Data;

import java.util.List;

@Data
public class MessageRequest {
    List<Message> messageList;
    int listNumber;
    int userId;
}
