package com.chat.logger.mongodb;

import com.chat.logger.controller.message.vo.Message;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;

public interface MessageRepository extends MongoRepository<Message, ObjectId> {
    @Query("{ 'time': ?0 }")
    List<Message> findByTime(Date time);
}
