package com.restaurant.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.restaurant.demo.model.KOT;

@Repository
public interface KOTRepository extends MongoRepository<KOT, String> {
}
