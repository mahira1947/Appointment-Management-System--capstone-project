CREATE DATABASE IF NOT EXISTS appointment_db; USE appointment_db;
CREATE TABLE IF NOT EXISTS users(user_id BIGINT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(120),email VARCHAR(160) UNIQUE,phone VARCHAR(30),password VARCHAR(255),role VARCHAR(20));
CREATE TABLE IF NOT EXISTS doctors(user_id BIGINT PRIMARY KEY,name VARCHAR(120),email VARCHAR(160),phone VARCHAR(30),specialization VARCHAR(120),experience INT,qualification VARCHAR(120),available BOOLEAN DEFAULT TRUE,FOREIGN KEY(user_id) REFERENCES users(user_id));
CREATE TABLE IF NOT EXISTS patients(user_id BIGINT PRIMARY KEY,medical_history TEXT,FOREIGN KEY(user_id) REFERENCES users(user_id));
CREATE TABLE IF NOT EXISTS time_slots(slot_id BIGINT PRIMARY KEY AUTO_INCREMENT,doctor_id BIGINT,slot_date DATE,start_time TIME,end_time TIME,available BOOLEAN DEFAULT TRUE,UNIQUE KEY uq_slot(doctor_id,slot_date,start_time,end_time));
CREATE TABLE IF NOT EXISTS appointments(appointment_id BIGINT PRIMARY KEY AUTO_INCREMENT,patient_id BIGINT,doctor_id BIGINT,slot_id BIGINT,service_id BIGINT,date DATE,reason VARCHAR(500),status VARCHAR(30),created_at DATETIME);
CREATE TABLE IF NOT EXISTS services(service_id BIGINT PRIMARY KEY AUTO_INCREMENT,service_name VARCHAR(120),description VARCHAR(500));
