package com.restaurant.demo.service;

import com.restaurant.demo.model.User;
import com.restaurant.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register Admin
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    // Find User by Email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
