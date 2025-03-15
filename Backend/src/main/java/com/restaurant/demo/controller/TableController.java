package com.restaurant.demo.controller;

import com.restaurant.demo.model.Table;
import com.restaurant.demo.service.TableService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class TableController {

    @Autowired
    private TableService tableService;

    // Get Available Tables
    @GetMapping("/available")
    public List<Table> getAvailableTables() {
        return tableService.getAvailableTables();
    }

    // Assign Table
    @PutMapping("/assign/{tableNumber}")
    public Table assignTable(@PathVariable int tableNumber) {
        return tableService.assignTable(tableNumber);
    }

    // Free Table
    @PutMapping("/free/{tableNumber}")
    public Table freeTable(@PathVariable int tableNumber) {
        return tableService.freeTable(tableNumber);
    }
}
