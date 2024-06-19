package com.chat.logger;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChatLoggerBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChatLoggerBackendApplication.class, args);
        System.out.println("Running on: http://localhost:8080");
    }

}
