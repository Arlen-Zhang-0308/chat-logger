package com.chat.logger.controller.user.vo;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document("users")
public class User {
    @Id
    private ObjectId id;

    private String username;

    private String email;

    private String password;

    private String lang;

    private Date createTime;

    private String role;

    public User() {
        this.lang = "zh";
        this.createTime = new Date();
        this.role = "USER";
    }
}

