package com.restaurant.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.restaurant.demo.model.Table;

import java.util.List;
import java.util.Optional;

@Repository
public interface TableRepository extends MongoRepository<Table, String> {
    List<Table> findByIsOccupiedFalse();
    Optional<Table> findByTableNumber(int tableNumber);
}
