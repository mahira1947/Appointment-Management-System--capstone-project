package com.careflow.appointment.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final JdbcTemplate jdbcTemplate;

    public AdminController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /*
     * Get currently logged-in user's email
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
     * Check whether logged-in user is ADMIN
     */
    private void requireAdmin() {

        try {

            String role =
                    jdbcTemplate.queryForObject(
                            "SELECT role FROM users WHERE email = ?",
                            String.class,
                            currentEmail()
                    );

            if (!"ADMIN".equalsIgnoreCase(role)) {

                throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN,
                        "Admin access required."
                );
            }

        } catch (ResponseStatusException e) {

            throw e;

        } catch (Exception e) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Admin account not found."
            );
        }
    }

    /*
     * =========================
     * ADMIN DASHBOARD
     * =========================
     */

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {

        requireAdmin();

        Map<String, Object> dashboard =
                new LinkedHashMap<>();

        /*
         * Total users
         */
        Integer totalUsers =
                jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM users
                        """,
                        Integer.class
                );

        /*
         * Total patients
         */
        Integer totalPatients =
                jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM patients
                        """,
                        Integer.class
                );

        /*
         * Total doctors
         */
        Integer totalDoctors =
                jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM doctors
                        """,
                        Integer.class
                );

        /*
         * Total appointments
         */
        Integer totalAppointments =
                jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM appointments
                        """,
                        Integer.class
                );

        /*
         * Booked appointments
         */
        Integer bookedAppointments =
                jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM appointments
                        WHERE status = 'BOOKED'
                        """,
                        Integer.class
                );

        /*
         * Completed appointments
         */
        Integer completedAppointments =
                jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM appointments
                        WHERE status = 'COMPLETED'
                        """,
                        Integer.class
                );

        /*
         * Cancelled appointments
         */
        Integer cancelledAppointments =
                jdbcTemplate.queryForObject(
                        """
                        SELECT COUNT(*)
                        FROM appointments
                        WHERE status = 'CANCELLED'
                        """,
                        Integer.class
                );

        dashboard.put(
                "totalUsers",
                totalUsers
        );

        dashboard.put(
                "totalPatients",
                totalPatients
        );

        dashboard.put(
                "totalDoctors",
                totalDoctors
        );

        dashboard.put(
                "totalAppointments",
                totalAppointments
        );

        dashboard.put(
                "bookedAppointments",
                bookedAppointments
        );

        dashboard.put(
                "completedAppointments",
                completedAppointments
        );

        dashboard.put(
                "cancelledAppointments",
                cancelledAppointments
        );

        return dashboard;
    }

    /*
     * =========================
     * ALL DOCTORS
     * =========================
     */

    @GetMapping("/doctors")
    public List<Map<String, Object>> doctors() {

        requireAdmin();

        return jdbcTemplate.queryForList(
                """
                SELECT
                    d.doctor_id AS id,
                    u.name AS name,
                    u.email AS email,
                    d.specialization AS specialization,
                    d.qualification AS qualification,
                    d.experience AS experience,
                    d.hospital AS hospital,
                    d.available AS available
                FROM doctors d
                JOIN users u
                  ON d.user_id = u.user_id
                ORDER BY d.doctor_id
                """
        );
    }

    /*
     * =========================
     * ALL PATIENTS
     * =========================
     */

    @GetMapping("/patients")
    public List<Map<String, Object>> patients() {

        requireAdmin();

        return jdbcTemplate.queryForList(
                """
                SELECT
                    p.patient_id AS id,
                    u.name AS name,
                    u.email AS email
                FROM patients p
                JOIN users u
                  ON p.user_id = u.user_id
                ORDER BY p.patient_id
                """
        );
    }

    /*
     * =========================
     * RECENT APPOINTMENTS
     * =========================
     */

    @GetMapping("/appointments")
    public List<Map<String, Object>> appointments() {

        requireAdmin();

        return jdbcTemplate.queryForList(
                """
                SELECT
                    a.appointment_id AS id,
                    CONCAT(
                        'APT-',
                        LPAD(a.appointment_id, 5, '0')
                    ) AS appointmentNumber,

                    pu.name AS patientName,
                    pu.email AS patientEmail,

                    du.name AS doctorName,
                    d.specialization AS specialization,

                    a.appointment_date AS appointmentDate,
                    a.reason AS reason,
                    a.status AS status,
                    a.created_at AS createdAt

                FROM appointments a

                JOIN patients p
                  ON a.patient_id = p.patient_id

                JOIN users pu
                  ON p.user_id = pu.user_id

                JOIN doctors d
                  ON a.doctor_id = d.doctor_id

                JOIN users du
                  ON d.user_id = du.user_id

                ORDER BY a.created_at DESC
                """
        );
    }
}