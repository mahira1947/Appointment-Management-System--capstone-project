package com.careflow.appointment.repository;

import com.careflow.appointment.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientIdOrderByDateDesc(Long id);
    List<Appointment> findByDoctorIdOrderByDateDesc(Long id);
}
