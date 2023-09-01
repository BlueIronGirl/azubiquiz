package com.example.azubiquiz.controller;

import com.example.azubiquiz.entity.Test;
import com.example.azubiquiz.service.TestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class TestController {
    private final TestService testService;

    @GetMapping("/tests")
    public ResponseEntity<List<Test>> selectAllTest() {
        return ResponseEntity.ok(testService.selectAllTest());
    }

    @GetMapping("/tests/{id}")
    public ResponseEntity<Test> selectTest(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(testService.selectTest(id));
    }

    @PostMapping("/tests")
    public ResponseEntity<Test> createTest(@Valid @RequestBody Test test) throws Exception {
        return ResponseEntity.ok(testService.createTest(test));
    }

    @PutMapping("/tests/{id}")
    public ResponseEntity<Test> update(@Valid @RequestBody Test test, @PathVariable Long id) throws Exception {
        return ResponseEntity.ok(testService.updateTest(test, id));
    }

    @DeleteMapping("/tests/{id}")
    public ResponseEntity<Test> deleteTest(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(testService.deleteTest(id));
    }

}
