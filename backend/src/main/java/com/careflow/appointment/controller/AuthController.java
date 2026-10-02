package com.careflow.appointment.controller;

import com.careflow.appointment.model.User;
import com.careflow.appointment.repository.UserRepository;
import com.careflow.appointment.security.JwtService;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthController(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users; this.encoder = encoder; this.jwt = jwt;
    }

    public record LoginRequest(String email, String password) {}
    public record LoginResponse(String token, Long userId, String name, String email, String role) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        if (request.email() == null || request.password() == null)
            return ResponseEntity.badRequest().body("Email and password are required.");

        var userOpt = users.findByEmail(request.email().trim().toLowerCase());
        if (userOpt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");

        User user = userOpt.get();
        boolean valid = encoder.matches(request.password(), user.getPassword());
        if (!valid && !user.getPassword().startsWith("$2")) {
            valid = request.password().equals(user.getPassword());
            if (valid) {
                user.setPassword(encoder.encode(request.password()));
                users.save(user);
            }
        }
        if (!valid) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");

        String role = user.getRole() == null ? "PATIENT" : user.getRole().toUpperCase();
        String token = jwt.createToken(user.getId(), user.getEmail(), role);
        return ResponseEntity.ok(new LoginResponse(token, user.getId(), user.getName(), user.getEmail(), role));
    }
}
