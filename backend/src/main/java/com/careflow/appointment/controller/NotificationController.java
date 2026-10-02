package com.careflow.appointment.controller;

import com.careflow.appointment.model.Notification;
import com.careflow.appointment.repository.NotificationRepository;

import io.jsonwebtoken.Claims;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notifications;

    public NotificationController(
            NotificationRepository notifications) {
        this.notifications = notifications;
    }

    private Long currentUserId() {

        var auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (auth != null &&
                auth.getDetails() instanceof Claims claims) {

            Number id =
                    claims.get("userId", Number.class);

            if (id != null) {
                return id.longValue();
            }
        }

        throw new RuntimeException(
                "User not logged in"
        );
    }

    @GetMapping
    public List<Notification> myNotifications() {

        return notifications
                .findByUserIdOrderByCreatedAtDesc(
                        currentUserId()
                );
    }

    @PostMapping("/{id}/read")
    public Notification markAsRead(
            @PathVariable Long id) {

        Notification notification =
                notifications.findById(id)
                        .orElseThrow();

        notification.setRead(true);

        return notifications.save(
                notification
        );
    }
}