# CareFlow — Run Guide

## 1. Database
Keep MySQL Server running.

Open MySQL Workbench and run:
- `database/schema.sql` only if creating the database for the first time.
- `database/seed.sql` for a fresh database.
- `database/auth-and-doctors.sql` for the current existing database to set the 6 doctors and login passwords.

Current login details:
- Patient: `patient@careflow.com` / `patient123`
- Dr. Rashitha: `rashitha@careflow.com` / `doctor123`
- Dr. Arjun Kumar: `arjun@careflow.com` / `doctor123`
- Dr. Priya Sharma: `priya@careflow.com` / `doctor123`
- Dr. Naveen Raj: `naveen@careflow.com` / `doctor123`
- Dr. Mahira: `mahira@careflow.com` / `doctor123`
- Dr. Ayesha: `ayesha@careflow.com` / `doctor123`

## 2. Backend
Open PowerShell:
```powershell
cd "C:\YOUR_PATH\CareFlow\backend"
mvn spring-boot:run
```
Backend: http://localhost:8080

## 3. Frontend
Open a second PowerShell:
```powershell
cd "C:\YOUR_PATH\CareFlow\frontend"
npm.cmd install
npm.cmd run dev
```
Frontend: http://localhost:5173

## 4. Flow
Patient login -> Doctors -> Book slot -> My Appointments.
Doctor login -> Doctor Dashboard -> only that doctor's appointments.
Doctor can Complete or Cancel their own appointments.

The backend uses JWT authentication and BCrypt password hashing. Existing plain demo passwords are upgraded to BCrypt on successful login.
