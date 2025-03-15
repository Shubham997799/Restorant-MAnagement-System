package com.restaurant.demo.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
@Data
@Document(collection = "bills")

@Builder
public class Bill {
    @Id
    private String id;
    private int tableNumber;
    private double totalAmount;
    private LocalDateTime generatedAt;
    private boolean isPaid;
}
