package com.restaurant.demo.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
@Data
@Document(collection = "kots")

@Builder
public class KOT {
    @Id
    private String id;
    private int tableNumber;
    private List<OrderItem> items;
    private LocalDateTime createdAt;
}
