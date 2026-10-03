# 🏥 CareFlow – Appointment Management System

### A Full-Stack Doctor Appointment Booking and Management Platform

CareFlow is a full-stack **Appointment Management System** designed to simplify and digitize the process of booking, managing, tracking, and administering doctor appointments.

The system provides separate experiences for **Patients, Doctors, and Administrators**, allowing each role to perform the operations relevant to them.

The application is built using **React + Tailwind CSS** for the frontend, **Spring Boot + Java** for the backend, and **MySQL** for persistent data storage.

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Problem Statement](#-problem-statement)
- [Project Objectives](#-project-objectives)
- [Key Features](#-key-features)
- [User Roles & Capabilities](#-user-roles--capabilities)
- [Patient Appointment Experience](#-patient-appointment-experience)
- [Doctor Appointment Experience](#-doctor-appointment-experience)
- [Admin Dashboard](#-admin-dashboard)
- [Appointment Lifecycle](#-appointment-lifecycle)
- [Notification System](#-notification-system)
- [System Architecture](#-system-architecture)
- [Application Workflow](#-application-workflow)
- [Technology Stack](#-technology-stack)
- [OOP Concepts Used](#-oop-concepts-used)
- [Authentication & Security](#-authentication--security)
- [Database Design](#-database-design)
- [Database Tables](#-database-tables)
- [Entity Relationships](#-entity-relationships)
- [Backend API Overview](#-backend-api-overview)
- [Frontend Structure](#-frontend-structure)
- [Backend Structure](#-backend-structure)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Prerequisites](#-prerequisites)
- [Database Setup](#-database-setup)
- [Backend Setup](#-backend-setup)
- [Frontend Setup](#-frontend-setup)
- [Running the Application](#-running-the-application)
- [Demo Credentials](#-demo-credentials)
- [Testing](#-testing)
- [Testing Checklist](#-testing-checklist)
- [API Testing](#-api-testing)
- [GitHub Workflow](#-github-workflow)
- [Future Enhancements](#-future-enhancements)
- [Project Documentation](#-project-documentation)
- [Academic Relevance](#-academic-relevance)
- [Advantages](#-advantages)
- [Conclusion](#-conclusion)
- [Author](#-author)
- [License](#-license)

---

# 📖 About the Project

CareFlow is a web-based appointment management platform developed to provide a simple, organized, and digital solution for managing doctor appointments.

Traditional appointment management may involve phone calls, manual registers, waiting queues, and difficulty in tracking appointment history.

CareFlow provides a centralized platform where:

- Patients can log in and book appointments.
- Patients can view their appointment history.
- Patients can cancel appointments.
- Doctors can log in using their own accounts.
- Doctors can view appointments assigned to them.
- Doctors can update appointment status.
- Administrators can monitor users, doctors, patients, and appointments.
- Notifications are generated when appointments are booked.
- Appointment information is stored in a MySQL database.
- The backend provides REST APIs for frontend communication.

The application follows a layered full-stack architecture using modern web development technologies.

---

# 🎯 Problem Statement

Managing doctor appointments manually can create several problems:

- Difficulty in checking doctor information.
- Manual appointment booking.
- Duplicate appointment records.
- Difficulty maintaining appointment history.
- Lack of centralized patient information.
- Difficulty for doctors to track appointments.
- Lack of administrative monitoring.
- Lack of proper notification support.
- Difficulty generating appointment statistics.

CareFlow addresses these problems by providing a centralized digital appointment management platform.

---

# 🎯 Project Objectives

The main objectives of CareFlow are:

1. To provide an online doctor appointment booking system.
2. To provide separate experiences for Patients, Doctors, and Administrators.
3. To store appointment information in a relational database.
4. To allow doctors to manage their assigned appointments.
5. To allow administrators to monitor the overall system.
6. To provide appointment notifications.
7. To provide appointment history and status tracking.
8. To demonstrate Object-Oriented Programming concepts using Java.
9. To implement REST APIs using Spring Boot.
10. To create a responsive frontend using React and Tailwind CSS.
11. To connect the frontend, backend, and database into one complete application.
12. To provide a scalable foundation for future healthcare features.

---

# ✨ Key Features

## 👤 Patient Features

- Patient login
- Secure authentication infrastructure
- Doctor listing
- Doctor specialization information
- Doctor experience information
- Doctor qualification information
- Appointment booking
- Appointment date selection
- Appointment reason entry
- Appointment confirmation
- Appointment number generation
- Appointment history
- Appointment cancellation
- Notification viewing
- Responsive dashboard

---

## 👨‍⚕️ Doctor Features

- Individual doctor login
- Doctor-specific dashboard
- View assigned appointments
- View patient information
- View appointment date
- View appointment reason
- View appointment status
- Complete appointments
- Cancel appointments
- Receive appointment notifications

---

## 🛠️ Administrator Features

- Admin login
- Dashboard statistics
- Total users
- Total patients
- Total doctors
- Total appointments
- Booked appointments
- Completed appointments
- Cancelled appointments
- Doctor management view
- Patient management view
- Appointment management view
- System-wide monitoring
- Dashboard refresh

---

# 👥 User Roles & Capabilities

CareFlow contains three primary user roles.

---

## 👤 1. Patient

The Patient is the primary user who books appointments.

### Patient can:

- Login
- Browse doctors
- View doctor specialization
- View doctor experience
- View doctor qualification
- Select a doctor
- Select an appointment date
- Enter appointment reason
- Confirm an appointment
- Receive an appointment number
- View booked appointments
- View appointment status
- Cancel appointments
- View notifications

---

## 👨‍⚕️ 2. Doctor

Doctors have individual accounts.

Each doctor can access appointments assigned to that doctor.

### Doctor can:

- Login
- View assigned appointments
- View patient information
- View appointment details
- View appointment date
- View appointment reason
- Complete an appointment
- Cancel an appointment
- Receive booking notifications

---

## 👨‍💼 3. Administrator

The administrator manages and monitors the overall application.

### Administrator can:

- Login
- View dashboard statistics
- View users
- View patients
- View doctors
- View appointments
- View appointment statuses
- Monitor system activity

---

# 👤 Patient Appointment Experience

The patient workflow is designed to be simple and easy to understand.

## Step 1 – Login

The patient enters:

- Email
- Password

Example:

Email:

```text
patient@careflow.com
```

Password:

```text
patient123
```

After successful authentication, the patient is redirected to the patient dashboard.

---

## Step 2 – View Doctors

After login, the patient can view the available doctors.

Each doctor card can contain information such as:

- Doctor name
- Specialization
- Experience
- Qualification
- Availability

Example:

```text
Dr. Rashitha
Cardiology
8 Years Experience
```

---

## Step 3 – Select Doctor

The patient selects the doctor required for the consultation.

The selected doctor's ID is sent to the backend while creating the appointment.

---

## Step 4 – Select Appointment Date

The patient selects the required appointment date.

The selected date becomes part of the appointment record.

---

## Step 5 – Enter Reason

The patient can enter the reason for the appointment.

Example:

```text
Regular consultation and health check-up.
```

---

## Step 6 – Confirm Appointment

After entering the required information, the patient confirms the appointment.

The frontend sends the appointment data to the Spring Boot backend.

Example request:

```json
{
  "doctorId": 1,
  "serviceId": 1,
  "date": "2026-10-03",
  "reason": "Regular consultation"
}
```

---

## Step 7 – Appointment Creation

The backend performs the following operations:

1. Validates the logged-in user.
2. Identifies the patient.
3. Identifies the selected doctor.
4. Checks for duplicate active appointments.
5. Creates the appointment.
6. Saves the appointment in MySQL.
7. Generates an appointment number.
8. Creates a patient notification.
9. Creates a doctor notification.

Example appointment number:

```text
APT-00003
```

---

## Step 8 – Patient Views Appointment

After successful booking, the patient can see the appointment in the dashboard.

The information can include:

- Appointment number
- Doctor name
- Appointment date
- Reason
- Status

Example:

```text
Appointment: APT-00003
Doctor: Dr. Rashitha
Date: 2026-10-03
Status: BOOKED
```

---

# 👨‍⚕️ Doctor Appointment Experience

Each doctor has an individual account.

Example:

```text
Doctor:
Dr. Rashitha

Email:
rashitha@careflow.com
```

When the doctor logs in, the backend identifies the doctor's account and retrieves the appointments assigned to that doctor.

The doctor does not need to manually search through all system appointments.

---

## Doctor Workflow

```text
Doctor Login
      ↓
Authentication
      ↓
Identify Doctor Account
      ↓
Identify Doctor ID
      ↓
Fetch Doctor Appointments
      ↓
Display Assigned Appointments
      ↓
View Patient Information
      ↓
Update Appointment Status
```

---

## Doctor Appointment Actions

The doctor can:

- View appointment
- View patient information
- View appointment date
- View appointment reason
- Complete appointment
- Cancel appointment

---

# 👨‍💼 Admin Dashboard

The Admin Dashboard provides centralized information about the application.

The dashboard displays important statistics.

## Dashboard Statistics

```text
Total Users
Total Patients
Total Doctors
Total Appointments
Booked Appointments
Completed Appointments
Cancelled Appointments
```

---

## Admin Sections

### Overview

Displays overall application statistics.

### Appointments

Displays appointment information across the system.

### Doctors

Displays registered doctors.

### Patients

Displays registered patients.

---

## Admin Workflow

```text
Admin Login
     ↓
Authentication
     ↓
Admin Dashboard
     ↓
View Statistics
     ↓
View Appointments
     ↓
View Doctors
     ↓
View Patients
```

---

# 🔄 Appointment Lifecycle

An appointment follows a simple lifecycle.

```text
Patient Selects Doctor
        ↓
Patient Selects Date
        ↓
Patient Enters Reason
        ↓
Confirm Appointment
        ↓
Appointment Created
        ↓
Status = BOOKED
        ↓
Notifications Created
        ↓
Doctor Views Appointment
        ↓
Doctor Updates Appointment
        ↓
COMPLETED / CANCELLED
```

---

## Appointment Status

The application supports the following appointment states:

### BOOKED

The appointment has been successfully created.

### COMPLETED

The appointment has been completed by the doctor.

### CANCELLED

The appointment has been cancelled.

---

# 🔔 Notification System

CareFlow contains a notification system connected to the appointment booking workflow.

Whenever a patient successfully books an appointment, the system creates notifications for both the patient and the doctor.

---

## Patient Notification

Example:

```text
Appointment APT-00003 booked successfully with Dr. Rashitha.
```

---

## Doctor Notification

Example:

```text
New appointment APT-00003 booked by patient.
```

---

## Notification Workflow

```text
Appointment Created
        ↓
Backend Saves Appointment
        ↓
Generate Appointment Number
        ↓
Identify Patient User ID
        ↓
Identify Doctor User ID
        ↓
Create Patient Notification
        ↓
Create Doctor Notification
        ↓
Save Notifications in MySQL
```

---

# 🏗️ System Architecture

CareFlow follows a layered full-stack architecture.

```text
┌────────────────────────────────────┐
│              USERS                 │
│                                    │
│ Patient | Doctor | Administrator   │
└─────────────────┬──────────────────┘
                  │
                  ▼
┌────────────────────────────────────┐
│          REACT FRONTEND            │
│                                    │
│ React + Tailwind CSS + Vite        │
│                                    │
│ Login                              │
│ Dashboards                         │
│ Doctor Listing                     │
│ Appointment Booking                │
│ Notifications                      │
└─────────────────┬──────────────────┘
                  │
                  │ REST API / JSON
                  ▼
┌────────────────────────────────────┐
│         SPRING BOOT BACKEND        │
│                                    │
│ Controllers                        │
│ Services                           │
│ Repositories                       │
│ Security                           │
│ JWT Authentication                 │
│ Business Logic                     │
└─────────────────┬──────────────────┘
                  │
                  ▼
┌────────────────────────────────────┐
│              MYSQL                 │
│                                    │
│ appointment_db                     │
│                                    │
│ Users                              │
│ Patients                           │
│ Doctors                            │
│ Appointments                       │
│ Notifications                      │
│ Services                           │
│ Other Supporting Tables            │
└────────────────────────────────────┘
```

---

# 🔄 Application Workflow

The complete application workflow is:

```text
User Opens Application
        ↓
Login Page
        ↓
Enter Email + Password
        ↓
POST /api/auth/login
        ↓
Backend Validates Credentials
        ↓
JWT Token Generated
        ↓
Frontend Receives Authentication Data
        ↓
Role Identified
        ↓
┌────────────┬────────────┬────────────┐
│  PATIENT   │   DOCTOR   │   ADMIN    │
└──────┬─────┴──────┬─────┴──────┬─────┘
       ↓            ↓            ↓
Patient          Doctor        Admin
Dashboard        Dashboard     Dashboard
       ↓            ↓            ↓
Booking          Assigned      System
Appointment      Appointments   Monitoring
```

---

# 💻 Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React | User Interface |
| JavaScript | Application Logic |
| Tailwind CSS | Styling |
| Vite | Development Server and Build Tool |
| Fetch API | Backend Communication |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Java | Programming Language |
| Spring Boot | Backend Framework |
| Spring Web | REST API Development |
| Spring Data JPA | Database Access |
| Spring Security | Security Infrastructure |
| JWT | Token-Based Authentication |
| Maven | Dependency Management |

---

## Database

| Technology | Purpose |
|------------|---------|
| MySQL | Relational Database |
| MySQL Workbench | Database Management |

---

## Development Tools

```text
Visual Studio Code
IntelliJ IDEA / Eclipse
MySQL Workbench
Git
GitHub
Postman
Google Chrome
```

---

# 🧠 OOP Concepts Used

CareFlow demonstrates important Object-Oriented Programming concepts using Java.

---

## 1. Encapsulation

Encapsulation keeps class data private and provides controlled access using methods.

Example:

```java
private Long id;
private String name;
private String email;
private String password;
```

Access is provided through getter and setter methods.

```java
getId()
setId()
getName()
setName()
```

---

## 2. Inheritance

The application uses a common `User` concept for different types of users.

Conceptually:

```text
             User
            /    \
           /      \
      Patient     Doctor
```

This allows common user properties to be reused.

---

## 3. Polymorphism

Different user types can have different roles.

The application can represent:

```text
PATIENT
DOCTOR
ADMIN
```

Role-related behavior can be handled through the user model.

---

## 4. Abstraction

Business operations are separated from the controller layer.

For example:

```text
Appointment Service
Notification Service
```

Controllers can call business operations without handling every database operation themselves.

---

## 5. Separation of Concerns

The backend separates responsibilities into:

```text
Controller
     ↓
Service
     ↓
Repository
     ↓
Database
```

This makes the application easier to maintain and extend.

---

# 🔐 Authentication & Security

CareFlow uses Spring Security infrastructure and JWT-based authentication.

---

## Login Flow

```text
User Enters Email + Password
             ↓
       POST /api/auth/login
             ↓
       Find User in Database
             ↓
       Validate Password
             ↓
       Generate JWT Token
             ↓
       Return Token + User Data
             ↓
       Frontend Uses Authentication Data
```

---

## JWT Token

The JWT contains information such as:

```text
User ID
Email
Role
Issued Time
Expiration Time
```

Example conceptual payload:

```json
{
  "userId": 8,
  "sub": "patient@careflow.com",
  "role": "PATIENT"
}
```

---

## Password Protection

The backend provides:

```text
BCryptPasswordEncoder
```

for password hashing.

The current authentication flow also supports migration of legacy plain-text demo passwords to BCrypt after a successful login.

---

# 🗄️ Database Design

Database name:

```text
appointment_db
```

The application uses a relational MySQL database for persistent data storage.

The database contains tables supporting:

- Users
- Patients
- Doctors
- Appointments
- Notifications
- Services
- Specializations
- Addresses
- Appointment History
- Doctor Availability
- Reminders
- Reviews
- Supporting scheduling data

---

# 📊 Database Tables

The project contains the following major tables:

```text
users
patients
doctors
appointments
notifications
services
specializations
addresses
appointment_history
doctor_availability
reminders
reviews
time_slots
```

The application currently handles appointment booking without requiring the frontend to select a time slot.

---

# 👤 Users Table

The `users` table stores common account information.

Important fields include:

```text
user_id
name
email
password
role
created_at
```

Roles include:

```text
PATIENT
DOCTOR
ADMIN
```

---

# 👨‍⚕️ Doctors Table

The `doctors` table stores doctor-specific information.

Important fields include:

```text
doctor_id
user_id
specialization
qualification
experience
hospital
available
```

The `user_id` connects the doctor profile with the main user account.

---

# 👤 Patients Table

The `patients` table stores patient-specific information.

A patient profile is connected to a user account using:

```text
user_id
```

---

# 📅 Appointments Table

The `appointments` table stores appointment information.

Important fields include:

```text
appointment_id
patient_id
doctor_id
slot_id
service_id
appointment_date
status
reason
created_at
```

Appointment statuses include:

```text
BOOKED
COMPLETED
CANCELLED
```

---

# 🔔 Notifications Table

The `notifications` table stores notifications generated for users.

Important fields include:

```text
notification_id
user_id
message
is_read
created_at
```

Each notification is associated with a user.

---

# 🔗 Entity Relationships

Simplified relationship:

```text
USER
 │
 ├───────────────┐
 │               │
 ▼               ▼
PATIENT        DOCTOR
 │               │
 │               │
 └───────┬───────┘
         │
         ▼
    APPOINTMENT
         │
         ├──────────► SERVICE
         │
         └──────────► NOTIFICATION
```

---

## User → Doctor

```text
users.user_id
      │
      ▼
doctors.user_id
```

---

## User → Patient

```text
users.user_id
      │
      ▼
patients.user_id
```

---

## Patient → Appointment

```text
patients.patient_id
          │
          ▼
appointments.patient_id
```

---

## Doctor → Appointment

```text
doctors.doctor_id
        │
        ▼
appointments.doctor_id
```

---

# 🔌 Backend API Overview

Backend base URL:

```text
http://localhost:8080
```

---

# 🔑 Authentication API

## Login

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "patient@careflow.com",
  "password": "patient123"
}
```

Successful login returns authentication information including:

- JWT token
- User ID
- Name
- Email
- Role

---

# 👨‍⚕️ Doctor API

## Get Doctors

```http
GET /api/doctors
```

This endpoint returns available doctors.

Example response:

```json
[
  {
    "id": 1,
    "name": "Dr. Rashitha",
    "email": "rashitha@careflow.com",
    "specialization": "Cardiology",
    "experience": 8,
    "available": true
  }
]
```

---

# 📅 Appointment APIs

## Create Appointment

```http
POST /api/appointments
```

Example request:

```json
{
  "doctorId": 1,
  "serviceId": 1,
  "date": "2026-10-03",
  "reason": "Regular consultation"
}
```

---

## Get My Appointments

```http
GET /api/appointments/mine
```

For a patient, the endpoint returns the patient's appointments.

For a doctor, the endpoint returns appointments assigned to that doctor.

---

## Cancel Appointment

```http
PUT /api/appointments/{id}/cancel
```

---

## Complete Appointment

```http
PUT /api/appointments/{id}/complete
```

---

# 🔔 Notification APIs

## Get My Notifications

```http
GET /api/notifications
```

---

## Mark Notification as Read

```http
POST /api/notifications/{id}/read
```

---

# 🛠️ Admin APIs

## Dashboard Statistics

```http
GET /api/admin/dashboard
```

---

## Doctors

```http
GET /api/admin/doctors
```

---

## Patients

```http
GET /api/admin/patients
```

---

## Appointments

```http
GET /api/admin/appointments
```

---

# ⚛️ Frontend Structure

The frontend is implemented using React.

```text
frontend/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   │
│   └── ...
│
├── package.json
├── vite.config.js
├── tailwind.config.js
└── index.html
```

---

# ☕ Backend Structure

The Spring Boot backend follows a layered architecture.

```text
backend/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── careflow/
│   │   │           └── appointment/
│   │   │
│   │   │               ├── controller/
│   │   │               ├── model/
│   │   │               ├── repository/
│   │   │               ├── service/
│   │   │               └── security/
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│
├── pom.xml
└── ...
```

---

# 📁 Project Structure

```text
Appointment-Management-System--capstone-project/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── ...
│
├── Architecture.pdf
├── Class_Diagram.pdf
├── ER_Diagram.pdf
├── ProblemStatement.md
├── README.md
├── RUN-ME.md
└── .gitignore
```

---

# 🚀 Getting Started

Follow the steps below to run CareFlow locally.

---

# 📋 Prerequisites

Install the following software before running the project.

## Java

Check Java:

```powershell
java -version
```

---

## Maven

Check Maven:

```powershell
mvn -version
```

---

## Node.js

Check Node.js:

```powershell
node -v
```

---

## npm

Check npm:

```powershell
npm -v
```

---

## MySQL

Install:

```text
MySQL Server
MySQL Workbench
```

---

# 🗄️ Database Setup

Open MySQL Workbench.

Create the database:

```sql
CREATE DATABASE appointment_db;
```

Select the database:

```sql
USE appointment_db;
```

Then execute the database SQL files available in the project.

Verify the tables using:

```sql
SHOW TABLES;
```

---

# 🔧 Backend Configuration

Open:

```text
backend/src/main/resources/application.properties
```

Configure the MySQL connection.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/appointment_db
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

server.port=8080
```

Replace:

```text
YOUR_MYSQL_PASSWORD
```

with the password configured for your MySQL installation.

---

# ☕ Backend Setup

Open PowerShell.

Navigate to the backend directory:

```powershell
cd "C:\Users\Admin\Desktop\capstone M\backend"
```

Compile the project:

```powershell
mvn clean compile
```

If compilation succeeds, start the backend:

```powershell
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

---

# ⚛️ Frontend Setup

Open another PowerShell window.

Navigate to the frontend:

```powershell
cd "C:\Users\Admin\Desktop\capstone M\frontend"
```

Install dependencies:

```powershell
npm install
```

Start the frontend:

```powershell
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# ▶️ Running the Complete Application

Two terminals are required.

## Terminal 1 – Backend

```powershell
cd "C:\Users\Admin\Desktop\capstone M\backend"
mvn spring-boot:run
```

## Terminal 2 – Frontend

```powershell
cd "C:\Users\Admin\Desktop\capstone M\frontend"
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# 🔑 Demo Credentials

## 👤 Patient

```text
Email:
patient@careflow.com

Password:
patient123
```

---

## 👨‍⚕️ Dr. Rashitha

```text
Email:
rashitha@careflow.com

Password:
rashitha123
```

---

## 👨‍⚕️ Dr. Arjun Kumar

```text
Email:
arjun@careflow.com

Password:
arjun123
```

---

## 👩‍⚕️ Dr. Priya Sharma

```text
Email:
priya@careflow.com

Password:
priya123
```

---

## 👨‍⚕️ Dr. Naveen Raj

```text
Email:
naveen@careflow.com

Password:
naveen123
```

---

## 👩‍⚕️ Dr. Mahira

```text
Email:
mahira@careflow.com

Password:
mahira123
```

---

## 👩‍⚕️ Dr. Ayesha

```text
Email:
ayesha@careflow.com

Password:
ayesha123
```

---

## 👨‍💼 Administrator

```text
Email:
admin@careflow.local

Password:
admin123
```

---

# 🧪 Testing

CareFlow can be tested through:

```text
Frontend UI
REST APIs
MySQL Workbench
Browser Developer Tools
Postman
```

---

# ✅ Testing Checklist

## Authentication

- [x] Patient login
- [x] Doctor login
- [x] Admin login
- [x] Invalid login handling
- [x] JWT generation
- [x] Role identification

---

## Patient

- [x] Patient dashboard
- [x] Doctor listing
- [x] Doctor selection
- [x] Appointment booking
- [x] Appointment confirmation
- [x] Appointment number generation
- [x] Appointment history
- [x] Appointment cancellation
- [x] Notifications

---

## Doctor

- [x] Doctor login
- [x] Doctor-specific appointments
- [x] Appointment details
- [x] Complete appointment
- [x] Cancel appointment
- [x] Doctor notification

---

## Admin

- [x] Admin login
- [x] Dashboard statistics
- [x] Doctor list
- [x] Patient list
- [x] Appointment list
- [x] Dashboard refresh

---

## Database

- [x] User records
- [x] Doctor records
- [x] Patient records
- [x] Appointment records
- [x] Notification records
- [x] Appointment status updates

---

# 🧪 API Testing

The APIs can be tested using Postman.

Example login request:

```text
POST
http://localhost:8080/api/auth/login
```

Request:

```json
{
  "email": "patient@careflow.com",
  "password": "patient123"
}
```

After successful authentication, the API returns authentication information including the JWT token.

---

# 🔍 Complete Appointment Testing Flow

Use the following flow to verify the complete system:

```text
1. Login as Patient
2. Open Patient Dashboard
3. View Doctors
4. Select a Doctor
5. Select Appointment Date
6. Enter Appointment Reason
7. Confirm Appointment
8. Verify Appointment Number
9. Verify Appointment in Patient Dashboard
10. Check Patient Notification
11. Logout
12. Login as Doctor
13. Verify Doctor Appointment
14. View Patient Information
15. Complete or Cancel Appointment
16. Verify Appointment Status
17. Check Doctor Notification
18. Logout
19. Login as Admin
20. Open Admin Dashboard
21. Verify Appointment Statistics
22. View Doctors
23. View Patients
24. View Appointments
```

---

# 🔔 Notification Testing

After booking an appointment, check the notification records.

Run:

```sql
SELECT *
FROM notifications
ORDER BY notification_id DESC;
```

The database should contain notification records for the relevant patient and doctor.

Example patient notification:

```text
Appointment APT-00003 booked successfully with Dr. Rashitha.
```

Example doctor notification:

```text
New appointment APT-00003 booked by patient.
```

---

# 🧑‍💻 GitHub Workflow

The project uses Git and GitHub for version control.

Check project status:

```powershell
git status
```

Add changes:

```powershell
git add .
```

Commit changes:

```powershell
git commit -m "Update appointment management system"
```

Push changes:

```powershell
git push
```

---

# 🌿 Recommended Branch Workflow

```text
main
 │
 ├── frontend-development
 │
 ├── backend-development
 │
 └── feature-development
```

Typical workflow:

```text
Feature Development
        ↓
Testing
        ↓
Commit
        ↓
Push
        ↓
Review
        ↓
Merge
        ↓
main
```

---

# 📚 Project Documentation

The repository contains supporting academic documentation.

Important documentation includes:

```text
Architecture.pdf
Class_Diagram.pdf
ER_Diagram.pdf
ProblemStatement.md
RUN-ME.md
README.md
```

---

# 🏗️ Architecture Documentation

The architecture documentation explains the interaction between:

```text
React Frontend
      ↓
REST API
      ↓
Spring Boot
      ↓
Business Logic
      ↓
MySQL Database
```

---

# 📐 Class Diagram

The class diagram represents important Java classes and their relationships.

Major concepts include:

```text
User
Patient
Doctor
Appointment
Notification
Service
Controller
Repository
```

---

# 🗃️ ER Diagram

The ER diagram represents relationships between database entities.

Major entities include:

```text
Users
Patients
Doctors
Appointments
Services
Notifications
```

---

# 🎓 Academic Relevance

CareFlow demonstrates multiple concepts relevant to software engineering and Object-Oriented Programming.

---

## Object-Oriented Programming

The project demonstrates:

```text
Encapsulation
Inheritance
Polymorphism
Abstraction
```

---

## Database Concepts

The project demonstrates:

```text
Relational Database
Primary Keys
Foreign Keys
Relationships
CRUD Operations
SQL Queries
Data Persistence
```

---

## Web Development

The project demonstrates:

```text
Frontend Development
Backend Development
REST APIs
JSON Communication
Authentication
Database Integration
```

---

## Software Architecture

The application separates:

```text
Presentation Layer
Business Layer
Data Access Layer
Database Layer
```

---

# 🌟 Advantages

## For Patients

- Easy appointment booking
- Centralized appointment history
- Doctor information in one place
- Appointment status tracking
- Appointment notifications
- Simple web-based interface

---

## For Doctors

- Dedicated login
- Doctor-specific appointment list
- Appointment status management
- Patient information access
- Booking notifications
- Reduced manual tracking

---

## For Administrators

- Centralized monitoring
- Dashboard statistics
- Doctor management view
- Patient management view
- Appointment monitoring
- System overview

---

# 🔮 Future Enhancements

The current system can be extended with additional healthcare features.

---

## 💳 Online Payments

Future versions can integrate payment gateways such as:

```text
Razorpay
Stripe
PayPal
```

This can allow patients to complete appointment payments online.

---

## 📧 Email Notifications

The system can be extended to send:

- Appointment confirmations
- Appointment reminders
- Cancellation notifications
- Doctor updates

---

## 📱 SMS Notifications

SMS notifications can be added for appointment reminders.

---

## 🤖 AI Assistant

An AI assistant can help patients:

- Find suitable doctors
- Understand appointment information
- Navigate the application
- Receive reminders
- Ask general appointment-related questions

---

## 📊 Advanced Analytics

The Admin Dashboard can be expanded with:

```text
Doctor Statistics
Patient Statistics
Monthly Appointment Reports
Appointment Trends
Cancellation Analysis
Completed Appointment Reports
```

---

## 📅 Advanced Scheduling

Future versions can support:

```text
Doctor Working Hours
Multiple Time Slots
Dynamic Availability
Holiday Management
Doctor Leave Management
```

---

## 🏥 Multi-Hospital Support

The system can be extended to support:

```text
Multiple Hospitals
Multiple Branches
Hospital Administrators
Department Management
```

---

## 📹 Online Consultation

Future versions can support video consultation using suitable communication technologies.

---

## 📋 Medical Records

Future modules could include:

```text
Patient Medical Records
Prescriptions
Laboratory Reports
Medical Documents
Treatment History
```

---

# 🚀 Scalability

The project separates frontend, backend, database, authentication, and business logic.

This makes it possible to add additional modules in future versions.

Possible future modules include:

```text
Payments
Medical Records
Prescriptions
Laboratory Reports
Pharmacy
Insurance
Video Consultation
AI Assistant
Multi-Hospital Management
```

---

# 🛡️ Security Considerations

The application includes authentication infrastructure using:

```text
Spring Security
JWT
BCrypt Password Encoder
```

The backend identifies the authenticated user while processing user-specific appointment and notification operations.

For production deployment, additional security hardening should be implemented.

Recommended production improvements include:

```text
Strict endpoint authorization
HTTPS
Production secret management
Secure database credentials
Rate limiting
Audit logging
Input validation
Secure CORS configuration
```

---

# 📈 Project Roadmap

```text
Current System
      ↓
Appointment Management
      ↓
Advanced Notifications
      ↓
Online Payments
      ↓
Medical Records
      ↓
AI Assistant
      ↓
Video Consultation
      ↓
Multi-Hospital Platform
```

---

# 🖼️ Screenshots

Application screenshots can be added to the repository under:

```text
screenshots/
```

Suggested screenshots:

```text
Login Page
Patient Dashboard
Doctor Listing
Appointment Booking
Appointment Confirmation
Doctor Dashboard
Admin Dashboard
Notification Panel
```

Example Markdown:

```markdown
![Login Page](screenshots/login.png)

![Patient Dashboard](screenshots/patient-dashboard.png)

![Doctor Dashboard](screenshots/doctor-dashboard.png)

![Admin Dashboard](screenshots/admin-dashboard.png)
```

---

# 🎥 Project Demonstration Flow

For a project demonstration, the following sequence can be used:

```text
1. Open CareFlow
2. Show Login Page
3. Login as Patient
4. Show Patient Dashboard
5. Show Doctor List
6. Select Doctor
7. Select Appointment Date
8. Enter Appointment Reason
9. Confirm Appointment
10. Show Appointment Number
11. Show Patient Notification
12. Logout
13. Login as Doctor
14. Show Doctor Dashboard
15. Show Assigned Appointment
16. Complete Appointment
17. Logout
18. Login as Admin
19. Show Admin Dashboard
20. Show Appointment Statistics
21. Show Doctor List
22. Show Patient List
23. Show Appointment List
```

---

# 🎤 Project Presentation Flow

The project can be explained using the following presentation structure.

## Slide 1 – Title

```text
CareFlow
Appointment Management System
```

---

## Slide 2 – Problem Statement

Explain the problems associated with manual appointment management.

---

## Slide 3 – Proposed Solution

Explain how CareFlow provides a centralized digital appointment management platform.

---

## Slide 4 – User Roles

```text
Patient
Doctor
Administrator
```

---

## Slide 5 – Key Features

Explain:

```text
Doctor Management
Appointment Booking
Appointment Tracking
Notifications
Admin Dashboard
```

---

## Slide 6 – System Architecture

Explain:

```text
React
   ↓
Spring Boot
   ↓
MySQL
```

---

## Slide 7 – Database

Explain:

```text
Users
Patients
Doctors
Appointments
Notifications
```

---

## Slide 8 – OOP Concepts

Explain:

```text
Encapsulation
Inheritance
Polymorphism
Abstraction
```

---

## Slide 9 – Authentication

Explain:

```text
Login
JWT
Spring Security
BCrypt
```

---

## Slide 10 – Appointment Workflow

Explain:

```text
Patient
   ↓
Doctor Selection
   ↓
Date Selection
   ↓
Booking
   ↓
Appointment
```

---

## Slide 11 – Notifications

Explain how notifications are generated for patients and doctors.

---

## Slide 12 – Admin Dashboard

Explain:

```text
Users
Doctors
Patients
Appointments
Statistics
```

---

## Slide 13 – Future Enhancements

Explain:

```text
Payments
AI Assistant
Medical Records
Video Consultation
Multi-Hospital Support
```

---

## Slide 14 – Conclusion

Explain how CareFlow simplifies appointment management by connecting patients, doctors, administrators, appointments, notifications, and database services in one platform.

---

# 🧪 Final System Verification

Before final submission, verify:

```text
☑ MySQL is running
☑ appointment_db exists
☑ Required tables exist
☑ Backend compiles successfully
☑ Backend starts successfully
☑ Frontend dependencies installed
☑ Frontend starts successfully
☑ Patient login works
☑ Doctor login works
☑ Admin login works
☑ Doctor list loads
☑ Appointment booking works
☑ Appointment number is generated
☑ Patient appointment is displayed
☑ Doctor appointment is displayed
☑ Appointment status can be updated
☑ Notifications are created
☑ Admin dashboard loads
☑ Admin statistics load
☑ GitHub repository contains latest project
```

---

# 🏁 Conclusion

CareFlow provides a complete digital solution for managing doctor appointments.

The application connects:

```text
Patients
    +
Doctors
    +
Administrators
    +
Appointments
    +
Notifications
    +
Database
```

through a single web-based platform.

The project demonstrates practical implementation of:

```text
Java
Spring Boot
Spring Security
JWT
React
Tailwind CSS
REST APIs
MySQL
JPA
Git
GitHub
Object-Oriented Programming
```

CareFlow provides a strong foundation for future healthcare management features such as online payments, medical records, AI assistance, online consultations, and multi-hospital management.

---

# 👨‍💻 Author

## Ashik Rasool

Information Technology Student

Areas of Interest:

```text
Software Development
Full-Stack Development
Java
Python
Artificial Intelligence
Cloud Computing
```

---

# 🤝 Contributors

This project was developed as part of a college capstone project.

Team members can be listed below:

```text
Add Team Member Names Here
```

---

# 📄 License

This project is developed for educational and academic purposes.

The project may be modified and extended for learning, development, and demonstration purposes.

---

# ⭐ Project

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

# 🏥 CareFlow

### Making Appointment Management Simple, Organized and Digital.

```text
Patient → Doctor → Appointment → Notification → Management
```

**Built with ❤️ using Java, Spring Boot, React, Tailwind CSS and MySQL.**
