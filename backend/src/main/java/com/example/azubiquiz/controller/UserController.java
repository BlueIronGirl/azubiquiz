package com.example.azubiquiz.controller;

import com.example.azubiquiz.entity.User;
import com.example.azubiquiz.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> selectAllUser() {
        return ResponseEntity.ok(userService.selectAllUser());
    }

    @GetMapping("users/{id}")
    public ResponseEntity<User> selectUser(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(userService.selectUser(id));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> update(@Valid @RequestBody User user, @PathVariable Long id) throws Exception {
        return ResponseEntity.ok(userService.update(user, id));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(userService.deleteUser(id));
    }
}
