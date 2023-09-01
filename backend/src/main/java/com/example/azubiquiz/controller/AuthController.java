package com.example.azubiquiz.controller;

import com.example.azubiquiz.config.UserAuthenticationProvider;
import com.example.azubiquiz.dto.LoginDto;
import com.example.azubiquiz.dto.RegisterDto;
import com.example.azubiquiz.entity.User;
import com.example.azubiquiz.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {
    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;

    @PostMapping("/auth/login")
    public ResponseEntity<User> login(@Valid @RequestBody LoginDto loginDto) {
        User user = userService.login(loginDto);
        user.setToken(userAuthenticationProvider.createToken(user));

        return ResponseEntity.ok(user);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterDto registerDto) {
        User createdUser = userService.register(registerDto);
        createdUser.setToken(userAuthenticationProvider.createToken(createdUser));
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }
}
