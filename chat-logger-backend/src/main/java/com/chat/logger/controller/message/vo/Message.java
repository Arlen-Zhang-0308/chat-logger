package com.chat.logger.controller.message.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document("messages")
@NoArgsConstructor
public class Message {
//    @JsonProperty("_id")
    @Id
    private ObjectId id;

    private ObjectId userId;

    private Date time;

    private String message;

    public Message(ObjectId userId, Date time, String message) {
        this.userId = userId;
        this.time = time;
        this.message = message;
    }
}