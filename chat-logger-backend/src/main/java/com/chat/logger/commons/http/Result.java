package com.chat.logger.commons.http;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result {
    String result;
    String message;

    public static Result ok(String message) {
        return new Result("ok", message);
    }
    public static Result ok() {
        return new Result("ok", "success");
    }


    public static Result err(String message) {
        return new Result("failed", message);
    }
}
