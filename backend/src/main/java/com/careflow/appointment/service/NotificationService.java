package com.careflow.appointment.service;

import com.careflow.appointment.model.Notification;
import com.careflow.appointment.repository.NotificationRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService {

    private final NotificationRepository notifications;

    public NotificationService(
            NotificationRepository notifications) {
        this.notifications = notifications;
    }

    public void createNotification(
            Long userId,
            String message) {

        Notification notification =
                new Notification();

        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setCreatedAt(
                LocalDateTime.now()
        );

        notifications.save(notification);
    }
}