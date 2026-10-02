package com.careflow.appointment.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "is_read")
    private Boolean read = false;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getMessage() {
        return message;
    }

    public Boolean getRead() {
        return read;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}