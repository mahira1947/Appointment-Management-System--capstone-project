# 🩺 CareFlow — Appointment Management System

> **Healthcare made simple. Appointments made smarter.**

CareFlow is a full-stack **Appointment Management System** designed to simplify healthcare scheduling for **patients, doctors, and administrators** through a clean and responsive web application.

The system combines a modern React frontend with a Java Spring Boot REST API and MySQL database to provide a complete appointment management workflow.

---

## ✨ What is CareFlow?

CareFlow brings the complete appointment lifecycle into one platform:

**Patient → Doctor → Appointment → Notification → History**

Patients can discover doctors and book appointments, doctors can manage their appointments, and administrators can monitor the complete system through a dedicated dashboard.

---

## 🎯 Core Features

### 👤 Patient Portal
- 🔐 Secure login
- 👨‍⚕️ Browse available doctors
- 🏥 View doctor specialization and experience
- 📅 Book appointments
- 📝 Add appointment reason
- 🔔 Receive appointment notifications
- ❌ Cancel appointments
- 📋 View appointment history
- 📱 Responsive mobile-friendly interface

### 👨‍⚕️ Doctor Portal
- 🔐 Doctor authentication
- 📋 View personal appointments
- 👤 See patient appointment details
- ✅ Mark appointments as completed
- ❌ Cancel appointments
- 🔔 Receive new appointment notifications
- 🔒 Doctors only see their own appointments

### 👨‍💼 Administrator Portal
- 📊 System overview dashboard
- 👥 Total users and patients
- 👨‍⚕️ Doctor management overview
- 📅 Appointment statistics
- 🟢 Booked / completed / cancelled tracking
- 📋 Appointment monitoring
- 👨‍⚕️ Doctor listing
- 👤 Patient listing
- 🔄 Refreshable dashboard data

---

# 🧠 System Architecture

```text
                    ┌──────────────────────┐
                    │      CareFlow UI     │
                    │   React + Tailwind   │
                    └──────────┬───────────┘
                               │
                               │ REST API / JSON
                               ▼
                    ┌──────────────────────┐
                    │    Spring Boot API   │
                    │   Java + Security    │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
             ┌─────────────┐       ┌─────────────┐
             │ Spring Data │       │ JWT Security│
             │    JPA      │       │    Layer    │
             └──────┬──────┘       └─────────────┘
                    │
                    ▼
             ┌─────────────┐
             │   MySQL 8   │
             │ appointment │
             │     _db     │
             └─────────────┘
