package com.chat.logger.commons.http;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result {
    String result;
    Object message;

    public static Result ok(String message) {
        return new Result("ok", message);
    }
    public static Result ok() {
        return new Result("ok", "success");
    }

    public static Result ok(Object data) {
        return new Result("ok", data);
    }

    public static Result err(String message) {
        return new Result("failed", message);
    }
}
