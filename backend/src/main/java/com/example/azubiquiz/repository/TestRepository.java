package com.example.azubiquiz.repository;

import com.example.azubiquiz.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test, Long> {
}