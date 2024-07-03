package com.chat.logger.service.user;

import com.chat.logger.controller.user.vo.User;
import com.chat.logger.mongodb.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User getUserById(ObjectId uid) {
        return userRepository.findById(uid).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
}
