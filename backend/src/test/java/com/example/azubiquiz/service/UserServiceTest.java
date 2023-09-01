package com.example.azubiquiz.service;

import com.example.azubiquiz.dto.LoginDto;
import com.example.azubiquiz.dto.RegisterDto;
import com.example.azubiquiz.entity.User;
import com.example.azubiquiz.repository.UserRepository;
import jakarta.validation.Validator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.nio.CharBuffer;
import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * @author alice_b
 */
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private PasswordEncoder passwordEncoder;

  @Mock
  private Validator validator;

  @InjectMocks
  private UserService userService;

  public static final String USERNAME = "USERNAME";
  public static final String PASSWORD = "PASSWORD";
  public static final String NAME = "NAME";
  public static final String TOKEN = "TOKEN";

  private User user;

  @BeforeEach
  public void setup() {
    user = User.builder()
        .id(1L)
        .username(USERNAME)
        .password(PASSWORD)
        .name(NAME)
        .token(TOKEN)
        .build();
  }

  /*
  FindByLogin
   */

  @Test
  void findByLogin_givenExistingUser_thenReturnUser() {
    when(userRepository.findByUsername(any())).thenReturn(Optional.of(user));

    User result = userService.findByLogin(USERNAME);

    assertEquals(USERNAME, result.getUsername());
  }

  @Test
  void findByLogin_givenNotExistingUser_thenThrowException() {
    when(userRepository.findByUsername(any())).thenReturn(Optional.empty());

    assertThrows(RuntimeException.class, () -> userService.findByLogin(USERNAME));
  }

  /*
  Login
   */

  @Test
  void login_givenExistingUser_thenReturnUser() {
    when(userRepository.findByUsername(any())).thenReturn(Optional.of(user));
    when(passwordEncoder.matches(Mockito.any(), Mockito.any())).thenReturn(true);

    LoginDto loginDto = new LoginDto("admin", "admin");
    User user = userService.login(loginDto);

    verify(passwordEncoder, Mockito.times(1)).matches(CharBuffer.wrap(loginDto.getPassword()), user.getPassword());
    assertEquals(USERNAME, user.getUsername());
  }

  @Test
  void login_givenNotExistingUser_thenThrowException() {
    when(userRepository.findByUsername(any())).thenReturn(Optional.empty());

    LoginDto loginDto = new LoginDto("admin", "admin");

    assertThrows(RuntimeException.class, () -> userService.login(loginDto));
  }

  @Test
  void login_givenExistingUserNoCorrectPassword_thenThrowException() {
    when(userRepository.findByUsername(any())).thenReturn(Optional.of(user));
    when(passwordEncoder.matches(Mockito.any(), Mockito.any())).thenReturn(false);

    LoginDto loginDto = new LoginDto("admin", "admin");

    assertThrows(RuntimeException.class, () -> userService.login(loginDto));
    verify(passwordEncoder, Mockito.times(1)).matches(CharBuffer.wrap(loginDto.getPassword()), user.getPassword());
  }

  /*
  Register
   */

  @Test
  void register_givenNotExistingUser_thenReturnUser() {
    when(userRepository.findByUsername(any())).thenReturn(Optional.empty());
    when(validator.validate(any())).thenReturn(new HashSet<>());
    given(userRepository.save(Mockito.any(User.class))).willReturn(user);

    User user = userService.register(new RegisterDto("admin", "admin", "admin"));

    verify(userRepository, Mockito.times(1)).save(Mockito.any(User.class));
    assertEquals(this.user.getUsername(), user.getUsername());
  }

  @Test
  void register_givenNotExistingUserWithoutName_thenReturnUser() {
// TODO (ALB) 17.08.2023: constraintvalidation

    when(userRepository.findByUsername(any())).thenReturn(Optional.empty());
    when(validator.validate(any())).thenReturn(new HashSet<>());
    given(userRepository.save(Mockito.any(User.class))).willReturn(user);

    User user = userService.register(new RegisterDto("admin", "admin", ""));

    verify(userRepository, Mockito.times(1)).save(Mockito.any(User.class));
    assertEquals(this.user.getUsername(), user.getUsername());
  }

  @Test
  void register_givenExisting_thenThrowException() {
    when(userRepository.findByUsername(any())).thenReturn(Optional.of(user));

    assertThrows(RuntimeException.class, () -> userService.register(new RegisterDto("admin", "admin", "admin")));
  }

  // TODO (ALB) 15.08.2023: validations

}
