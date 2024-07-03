package com.chat.logger.mongodb;

import com.chat.logger.controller.message.vo.Message;
import com.chat.logger.controller.user.vo.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    @Query("{ 'email': ?0 }")
    User findByEmail(String email);
}
