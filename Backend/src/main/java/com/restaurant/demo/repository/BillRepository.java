package com.restaurant.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.restaurant.demo.model.Bill;

@Repository
public interface BillRepository extends MongoRepository<Bill, String> {
}
