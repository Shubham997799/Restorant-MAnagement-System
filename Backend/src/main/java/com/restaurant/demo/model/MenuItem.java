package com.restaurant.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
@Data
@Document(collection = "menuItems")
public class MenuItem {
    @Id
    private String id;
    private String name;
    private double price;
    private boolean isAvailable;

    // Getters and Setters
}