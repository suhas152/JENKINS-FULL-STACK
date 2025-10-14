package com.klef.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.back.model.Function;

@Repository
public interface FunctionRepository extends JpaRepository<Function, Integer>{

}
