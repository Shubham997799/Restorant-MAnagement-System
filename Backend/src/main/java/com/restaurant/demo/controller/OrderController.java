package com.restaurant.demo.controller;

import com.restaurant.demo.model.Order;
import com.restaurant.demo.model.OrderItem;
import com.restaurant.demo.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Place a New Order
    @PostMapping("/place")
    public Order placeOrder(@RequestParam int tableNumber, @RequestBody List<OrderItem> items) {
        return orderService.placeOrder(tableNumber, items);
    }

    // Add Extra Order
    @PutMapping("/add-extra")
    public Order addExtraOrder(@RequestParam int tableNumber, @RequestBody List<OrderItem> extraItems) {
        return orderService.addExtraOrder(tableNumber, extraItems);
    }}