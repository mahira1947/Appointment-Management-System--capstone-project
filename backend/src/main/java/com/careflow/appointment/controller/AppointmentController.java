package com.careflow.appointment.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.careflow.appointment.model.Appointment;
import com.careflow.appointment.repository.AppointmentRepository;
import com.careflow.appointment.service.NotificationService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentRepository appointments;
    private final JdbcTemplate jdbcTemplate;
    private final NotificationService notificationService;

    public AppointmentController(
            AppointmentRepository appointments,
            JdbcTemplate jdbcTemplate,
            NotificationService notificationService) {

        this.appointments = appointments;
        this.jdbcTemplate = jdbcTemplate;
        this.notificationService = notificationService;
    }

    public record Book(
            Long doctorId,
            Long serviceId,
            LocalDate date,
            String reason
    ) {}

    public record AppointmentView(
            Long id,
            String appointmentNumber,
            Long patientId,
            String patientName,
            String patientEmail,
            Long doctorId,
            String doctorName,
            String doctorSpecialization,
            LocalDate date,
            String reason,
            String status,
            LocalDateTime createdAt
    ) {}

    private Claims claims() {

        var auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (auth == null ||
                !(auth.getDetails() instanceof Claims c)) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Please login again."
            );
        }

        return c;
    }

    /*
     * Get logged-in email directly from Spring Security.
     */
    private String currentEmail() {

        var auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (auth == null ||
                auth.getName() == null ||
                auth.getName().isBlank()) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "User not logged in."
            );
        }

        return auth.getName();
    }

    /*
     * Get actual user ID from database.
     */
    private Long currentUserId() {

        try {

            return jdbcTemplate.queryForObject(
                    "SELECT user_id FROM users WHERE email = ?",
                    Long.class,
                    currentEmail()
            );

        } catch (Exception e) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "User account not found."
            );
        }
    }

    /*
     * Get actual role from database.
     */
    private String currentRole() {

        try {

            return jdbcTemplate.queryForObject(
                    "SELECT role FROM users WHERE email = ?",
                    String.class,
                    currentEmail()
            );

        } catch (Exception e) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "User role not found."
            );
        }
    }

    private Long findPatientId(Long userId) {

        try {

            return jdbcTemplate.queryForObject(
                    "SELECT patient_id FROM patients WHERE user_id = ?",
                    Long.class,
                    userId
            );

        } catch (Exception e) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Patient profile not found."
            );
        }
    }

    private Long findDoctorId(Long userId) {

        try {

            return jdbcTemplate.queryForObject(
                    "SELECT doctor_id FROM doctors WHERE user_id = ?",
                    Long.class,
                    userId
            );

        } catch (Exception e) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Doctor profile not found."
            );
        }
    }

    private List<AppointmentView> views(
            List<Appointment> list) {

        return list.stream().map(a -> {

            Map<String, Object> patient =
                    jdbcTemplate.queryForMap(
                            """
                            SELECT u.name, u.email
                            FROM patients p
                            JOIN users u
                              ON p.user_id = u.user_id
                            WHERE p.patient_id = ?
                            """,
                            a.getPatientId()
                    );

            Map<String, Object> doctor =
                    jdbcTemplate.queryForMap(
                            """
                            SELECT u.name, d.specialization
                            FROM doctors d
                            JOIN users u
                              ON d.user_id = u.user_id
                            WHERE d.doctor_id = ?
                            """,
                            a.getDoctorId()
                    );

            String appointmentNumber =
                    String.format(
                            "APT-%05d",
                            a.getId()
                    );

            return new AppointmentView(
                    a.getId(),
                    appointmentNumber,
                    a.getPatientId(),
                    (String) patient.get("name"),
                    (String) patient.get("email"),
                    a.getDoctorId(),
                    (String) doctor.get("name"),
                    (String) doctor.get("specialization"),
                    a.getDate(),
                    a.getReason(),
                    a.getStatus(),
                    a.getCreatedAt()
            );

        }).toList();
    }

    /* =========================
       BOOK APPOINTMENT
       ========================= */

    @PostMapping
    public ResponseEntity<?> book(
            @RequestBody Book r) {

        String role = currentRole();

        if (!"PATIENT".equalsIgnoreCase(role)) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only patients can book appointments."
            );
        }

        if (r.doctorId() == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Doctor is required."
            );
        }

        if (r.date() == null) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Appointment date is required."
            );
        }

        Long userId = currentUserId();

        Long patientId = findPatientId(userId);

        /*
         * Prevent duplicate booking with same doctor
         * on the same date.
         */
        Integer existing =
                jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM appointments
                        WHERE patient_id = ?
                          AND doctor_id = ?
                          AND appointment_date = ?
                          AND status = 'BOOKED'
                        """,
                        Integer.class,
                        patientId,
                        r.doctorId(),
                        r.date()
                );

        if (existing != null && existing > 0) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "You already have an appointment with this doctor on this date."
            );
        }

        Appointment appointment =
                new Appointment();

        appointment.setPatientId(patientId);

        appointment.setDoctorId(
                r.doctorId()
        );

        /*
         * No slot system.
         */
        appointment.setSlotId(null);

        appointment.setServiceId(
                r.serviceId() == null
                        ? 1L
                        : r.serviceId()
        );

        appointment.setDate(
                r.date()
        );

        appointment.setReason(
                r.reason()
        );

        appointment.setStatus(
                "BOOKED"
        );

        appointment.setCreatedAt(
                LocalDateTime.now()
        );

        Appointment saved =
                appointments.save(appointment);

        /*
         * Generate appointment number.
         */
        String appointmentNumber =
                String.format(
                        "APT-%05d",
                        saved.getId()
                );

        /*
         * Get doctor details for notification.
         */
        String doctorName =
                jdbcTemplate.queryForObject(
                        """
                        SELECT u.name
                        FROM doctors d
                        JOIN users u
                          ON d.user_id = u.user_id
                        WHERE d.doctor_id = ?
                        """,
                        String.class,
                        saved.getDoctorId()
                );

        Long doctorUserId =
                jdbcTemplate.queryForObject(
                        "SELECT user_id FROM doctors WHERE doctor_id = ?",
                        Long.class,
                        saved.getDoctorId()
                );

        /*
         * Create notification for patient.
         */
        notificationService.createNotification(
                userId,
                "Appointment " + appointmentNumber
                        + " booked successfully with Dr. "
                        + doctorName
                        + " on "
                        + saved.getDate()
        );

        /*
         * Create notification for doctor.
         */
        notificationService.createNotification(
                doctorUserId,
                "New appointment " + appointmentNumber
                        + " booked by patient for "
                        + saved.getDate()
        );

        Map<String, Object> response =
                new LinkedHashMap<>();

        response.put(
                "appointmentId",
                saved.getId()
        );

        response.put(
                "appointmentNumber",
                appointmentNumber
        );

        response.put(
                "message",
                "Appointment booked successfully."
        );

        response.put(
                "date",
                saved.getDate()
        );

        response.put(
                "status",
                saved.getStatus()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    /* =========================
       MY APPOINTMENTS
       ========================= */

    @GetMapping("/mine")
    public List<AppointmentView> mine() {

        String role = currentRole();

        Long userId = currentUserId();

        if ("DOCTOR".equalsIgnoreCase(role)) {

            Long doctorId =
                    findDoctorId(userId);

            return views(
                    appointments
                            .findByDoctorIdOrderByDateDesc(
                                    doctorId
                            )
            );
        }

        Long patientId =
                findPatientId(userId);

        return views(
                appointments
                        .findByPatientIdOrderByDateDesc(
                                patientId
                        )
        );
    }

    /* =========================
       CANCEL
       ========================= */

    @PostMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(
            @PathVariable Long id) {

        String role = currentRole();

        Long userId = currentUserId();

        Appointment appointment =
                appointments.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Appointment not found."
                                )
                        );

        if ("PATIENT".equalsIgnoreCase(role)) {

            Long patientId =
                    findPatientId(userId);

            if (!Objects.equals(
                    appointment.getPatientId(),
                    patientId)) {

                throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN
                );
            }
        }

        if ("DOCTOR".equalsIgnoreCase(role)) {

            Long doctorId =
                    findDoctorId(userId);

            if (!Objects.equals(
                    appointment.getDoctorId(),
                    doctorId)) {

                throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN
                );
            }
        }

        appointment.setStatus(
                "CANCELLED"
        );

        appointments.save(
                appointment
        );

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Appointment cancelled successfully."
                )
        );
    }

    /* =========================
       COMPLETE
       ========================= */

    @PostMapping("/{id}/complete")
    public ResponseEntity<?> complete(
            @PathVariable Long id) {

        String role = currentRole();

        if (!"DOCTOR".equalsIgnoreCase(role)) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only doctors can complete appointments."
            );
        }

        Long userId =
                currentUserId();

        Long doctorId =
                findDoctorId(userId);

        Appointment appointment =
                appointments.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Appointment not found."
                                )
                        );

        if (!Objects.equals(
                appointment.getDoctorId(),
                doctorId)) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN
            );
        }

        appointment.setStatus(
                "COMPLETED"
        );

        return ResponseEntity.ok(
                appointments.save(
                        appointment
                )
        );
    }
}