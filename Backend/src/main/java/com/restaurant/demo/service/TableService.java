package com.restaurant.demo.service;

import com.restaurant.demo.model.Table;
import com.restaurant.demo.repository.TableRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TableService {

    @Autowired
    private TableRepository tableRepository;

    // Get Available Tables
    public List<Table> getAvailableTables() {
        return tableRepository.findByIsOccupiedFalse();
    }

    // Assign Table
    public Table assignTable(int tableNumber) {
        Optional<Table> tableOpt = tableRepository.findByTableNumber(tableNumber);
        if (tableOpt.isPresent()) {
            Table table = tableOpt.get();
            if (!table.isOccupied()) {
                table.setOccupied(true);
                return tableRepository.save(table);
            }
        }
        return null;  // Table not available
    }

    // Free a Table (Mark as Available)
    public Table freeTable(int tableNumber) {
        Optional<Table> tableOpt = tableRepository.findByTableNumber(tableNumber);
        if (tableOpt.isPresent()) {
            Table table = tableOpt.get();
            table.setOccupied(false);
            return tableRepository.save(table);
        }
        return null;
    }
}
