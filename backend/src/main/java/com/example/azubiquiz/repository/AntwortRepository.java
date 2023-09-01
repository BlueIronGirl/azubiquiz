package com.example.azubiquiz.repository;

import com.example.azubiquiz.entity.Antwort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AntwortRepository extends JpaRepository<Antwort, Long> {
}