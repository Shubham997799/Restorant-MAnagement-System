package com.restaurant.demo.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@Document(collection = "orders")

@Builder
public class Order {
    @Id
    private String id;
    private int tableNumber;
    private List<OrderItem> items;
    private double totalAmount;
    private boolean isPaid;
}
