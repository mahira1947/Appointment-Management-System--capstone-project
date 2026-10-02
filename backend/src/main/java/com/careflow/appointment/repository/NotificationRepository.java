package com.careflow.appointment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.careflow.appointment.model.Notification;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByUserIdOrderByCreatedAtDesc(
            Long userId
    );
}