package com.restaurant.demo.model;

import lombok.*;

@Data
@Builder
public class OrderItem {
    private String itemName;
    private int quantity;
    private double price;
}
