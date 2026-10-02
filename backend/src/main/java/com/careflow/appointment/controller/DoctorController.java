package com.careflow.appointment.controller;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final JdbcTemplate jdbcTemplate;

    public DoctorController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping
    public List<Map<String, Object>> allDoctors() {

        String sql = """
                SELECT
                    d.doctor_id AS id,
                    u.name AS name,
                    u.email AS email,
                    NULL AS phone,
                    d.specialization AS specialization,
                    d.experience AS experience,
                    d.qualification AS qualification,
                    d.available AS available
                FROM doctors d
                INNER JOIN users u
                    ON d.user_id = u.user_id
                WHERE d.available = true
                ORDER BY d.doctor_id
                """;

        return jdbcTemplate.queryForList(sql);
    }
}