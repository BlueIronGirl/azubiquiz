package com.example.azubiquiz.repository;

import com.example.azubiquiz.entity.Frage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FrageRepository extends JpaRepository<Frage, Long> {
}