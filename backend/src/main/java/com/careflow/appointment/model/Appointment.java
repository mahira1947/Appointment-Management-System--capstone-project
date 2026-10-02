package com.careflow.appointment.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private Long id;

    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;

    /*
     * Slot system is no longer used.
     */
    @Column(name = "slot_id")
    private Long slotId;

    @Column(name = "service_id")
    private Long serviceId;

    /*
     * IMPORTANT:
     * Java field "date" maps to MySQL "appointment_date".
     */
    @Column(name = "appointment_date", nullable = false)
    private LocalDate date;

    @Column(name = "reason")
    private String reason;

    @Column(name = "status")
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;


    public Long getId() {
        return id;
    }

    public Long getPatientId() {
        return patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public Long getSlotId() {
        return slotId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public LocalDate getDate() {
        return date;
    }

    public String getReason() {
        return reason;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public void setSlotId(Long slotId) {
        this.slotId = slotId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}