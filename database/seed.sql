USE appointment_db;

INSERT INTO users(user_id,name,email,phone,password,role) VALUES
(1,'Dr. Rashitha','rashitha@careflow.com','9000000001','doctor123','DOCTOR'),
(2,'Demo Patient','patient@careflow.com','9000000002','patient123','PATIENT'),
(3,'Dr. Arjun Kumar','arjun@careflow.com','9000000003','doctor123','DOCTOR'),
(4,'Dr. Priya Sharma','priya@careflow.com','9000000004','doctor123','DOCTOR'),
(5,'Dr. Naveen Raj','naveen@careflow.com','9000000005','doctor123','DOCTOR'),
(6,'Dr. Mahira','mahira@careflow.com','9000000006','doctor123','DOCTOR'),
(7,'Dr. Ayesha','ayesha@careflow.com','9000000007','doctor123','DOCTOR')
ON DUPLICATE KEY UPDATE name=VALUES(name),email=VALUES(email),phone=VALUES(phone),password=VALUES(password),role=VALUES(role);

INSERT INTO doctors(user_id,name,email,phone,specialization,experience,qualification,available) VALUES
(1,'Dr. Rashitha','rashitha@careflow.com','9000000001','Cardiology',8,'MBBS, MD',TRUE),
(3,'Dr. Arjun Kumar','arjun@careflow.com','9000000003','Physiotherapy',7,'BPT, MPT',TRUE),
(4,'Dr. Priya Sharma','priya@careflow.com','9000000004','Dermatology',9,'MBBS, MD Dermatology',TRUE),
(5,'Dr. Naveen Raj','naveen@careflow.com','9000000005','Orthopedics',10,'MBBS, MS Ortho',TRUE),
(6,'Dr. Mahira','mahira@careflow.com','9000000006','Pediatrics',9,'MBBS, MD Pediatrics',TRUE),
(7,'Dr. Ayesha','ayesha@careflow.com','9000000007','Neurology',11,'MBBS, DM Neurology',TRUE)
ON DUPLICATE KEY UPDATE name=VALUES(name),email=VALUES(email),phone=VALUES(phone),specialization=VALUES(specialization),experience=VALUES(experience),qualification=VALUES(qualification),available=TRUE;

INSERT INTO patients(user_id,medical_history) VALUES(2,'No known history')
ON DUPLICATE KEY UPDATE medical_history='No known history';

INSERT INTO services(service_id,service_name,description)
VALUES(1,'General Consultation','Doctor consultation')
ON DUPLICATE KEY UPDATE service_name='General Consultation';
