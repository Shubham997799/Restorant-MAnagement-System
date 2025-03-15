package com.restaurant.demo.service;

import com.restaurant.demo.model.Bill;
import com.restaurant.demo.model.KOT;
import com.restaurant.demo.model.Order;
import com.restaurant.demo.model.OrderItem;
import com.restaurant.demo.repository.BillRepository;
import com.restaurant.demo.repository.KOTRepository;
import com.restaurant.demo.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private KOTRepository kotRepository; // <-- Ensure this is declared

    @Autowired
    private BillRepository billRepository;

    // Place New Order & Generate KOT
    public Order placeOrder(int tableNumber, List<OrderItem> items) {
        double totalAmount = items.stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum();
        Order order = Order.builder()
                .tableNumber(tableNumber)
                .items(items)
                .totalAmount(totalAmount)
                .isPaid(false)
                .build();
        Order savedOrder = orderRepository.save(order);

        generateKOT(tableNumber, items);

        return savedOrder;
    }

    // Generate KOT for the order or extra items
    private void generateKOT(int tableNumber, List<OrderItem> items) {
        KOT kot = KOT.builder()
                .tableNumber(tableNumber)
                .items(items)
                .createdAt(LocalDateTime.now())
                .build();
        kotRepository.save(kot);
    }

    // Add Extra Items to an existing order and generate separate KOT
    public Order addExtraOrder(int tableNumber, List<OrderItem> extraItems) {
        Optional<Order> orderOpt = orderRepository.findByTableNumberAndIsPaidFalse(tableNumber);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.getItems().addAll(extraItems);
            double newTotal = order.getTotalAmount() + extraItems.stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum();
            order.setTotalAmount(newTotal);

            generateKOT(tableNumber, extraItems);

            return orderRepository.save(order);
        }
        return null;  // No active order found for the table
    }

    // Fetch Bill for a Table
    public Bill getBillForTable(int tableNumber) {
        Optional<Order> orderOpt = orderRepository.findByTableNumberAndIsPaidFalse(tableNumber);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            return Bill.builder()
                    .tableNumber(order.getTableNumber())
                    .totalAmount(order.getTotalAmount())
                    .generatedAt(LocalDateTime.now())
                    .isPaid(order.isPaid())
                    .build();
        }
        return null;
    }

    // Process Payment and Close the Bill
    public String processPayment(int tableNumber) {
        Optional<Order> orderOpt = orderRepository.findByTableNumberAndIsPaidFalse(tableNumber);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setPaid(true);
            orderRepository.save(order);

            Bill bill = Bill.builder()
                    .tableNumber(order.getTableNumber())
                    .totalAmount(order.getTotalAmount())
                    .generatedAt(LocalDateTime.now())
                    .isPaid(true)
                    .build();
            billRepository.save(bill);

            return "Payment Successful! Bill closed.";
        }
        return "No active order found for Table " + tableNumber;
    }
}
