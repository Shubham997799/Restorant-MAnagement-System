package com.restaurant.demo.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@Document(collection = "tables")

@Builder
public class Table {
    @Id
    private String id;
    private int tableNumber;
    private int capacity;
    private boolean isOccupied;
}
