package com.example.azubiquiz.service;

import com.example.azubiquiz.dto.LoginDto;
import com.example.azubiquiz.dto.RegisterDto;
import com.example.azubiquiz.entity.Test;
import com.example.azubiquiz.entity.User;
import com.example.azubiquiz.exception.EntityAlreadyExistsException;
import com.example.azubiquiz.repository.UserRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final Validator validator;
    private final PasswordEncoder passwordEncoder;

    public User login(LoginDto loginDto) {
        User user = findByLogin(loginDto.getUsername());

        if (passwordEncoder.matches(CharBuffer.wrap(loginDto.getPassword()), user.getPassword())) {
            return user;
        }
        throw new RuntimeException("Passwort falsch!");
    }

    public User register(RegisterDto registerDto) {
        Optional<User> optionalUser = userRepository.findByUsername(registerDto.getUsername());

        if (optionalUser.isPresent()) {
            throw new EntityAlreadyExistsException("Benutzer existiert bereits");
        }

        Set<ConstraintViolation<RegisterDto>> violations = validator.validate(registerDto);
        if (!violations.isEmpty()) {
            StringBuilder sb = new StringBuilder();
            for (ConstraintViolation<RegisterDto> constraintViolation : violations) {
                sb.append(constraintViolation.getMessage());
            }

            throw new ConstraintViolationException("Error occurred: " + sb, violations);
        }


        User user = User.builder()
                .username(registerDto.getUsername())
                .password(passwordEncoder.encode(CharBuffer.wrap(registerDto.getPassword())))
                .name(registerDto.getName())
                .build();

        return userRepository.save(user);
    }

    public User findByLogin(String login) {
        return userRepository.findByUsername(login)
                .orElseThrow(() -> new RuntimeException("Unbekannter User!"));
    }

    public List<User> selectAllUser() {
        return userRepository.findAll();
    }

    public User update(User userData, Long id) throws Exception {
        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(userData.getUsername());
                    user.setName(userData.getName());
                    user.setPassword(userData.getPassword());
                    user.setAdmin(userData.isAdmin());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new Exception("User nicht gefunden!"));
    }

    public User deleteUser(Long id) throws Exception {
        User user = userRepository.findById(id).orElseThrow(() -> new Exception("User nicht gefunden"));

        userRepository.deleteById(id);

        return user;
    }
}
