USE appointment_db;

-- Login credentials for the current CareFlow demo.
-- Patient: patient@careflow.com / patient123
-- Every doctor: their email / doctor123

SET SQL_SAFE_UPDATES = 0;

UPDATE users SET name='Dr. Rashitha', email='rashitha@careflow.com', password='doctor123', role='DOCTOR' WHERE email='rashitha@careflow.com' OR name='Dr. Rashitha';
UPDATE doctors SET name='Dr. Rashitha', email='rashitha@careflow.com', specialization='Cardiology', experience=8, qualification='MBBS, MD', available=TRUE WHERE email='rashitha@careflow.com' OR name='Dr. Rashitha';

UPDATE users SET name='Dr. Arjun Kumar', email='arjun@careflow.com', password='doctor123', role='DOCTOR' WHERE email='arjun@careflow.com' OR name='Dr. Arjun Kumar';
UPDATE doctors SET name='Dr. Arjun Kumar', email='arjun@careflow.com', specialization='Physiotherapy', experience=7, qualification='BPT, MPT', available=TRUE WHERE email='arjun@careflow.com' OR name='Dr. Arjun Kumar';

UPDATE users SET name='Dr. Priya Sharma', email='priya@careflow.com', password='doctor123', role='DOCTOR' WHERE email='priya@careflow.com' OR name='Dr. Priya Sharma';
UPDATE doctors SET name='Dr. Priya Sharma', email='priya@careflow.com', specialization='Dermatology', experience=9, qualification='MBBS, MD Dermatology', available=TRUE WHERE email='priya@careflow.com' OR name='Dr. Priya Sharma';

UPDATE users SET name='Dr. Naveen Raj', email='naveen@careflow.com', password='doctor123', role='DOCTOR' WHERE email='naveen@careflow.com' OR name='Dr. Naveen Raj';
UPDATE doctors SET name='Dr. Naveen Raj', email='naveen@careflow.com', specialization='Orthopedics', experience=10, qualification='MBBS, MS Ortho', available=TRUE WHERE email='naveen@careflow.com' OR name='Dr. Naveen Raj';

UPDATE users SET name='Dr. Mahira', email='mahira@careflow.com', password='doctor123', role='DOCTOR' WHERE email='mahira@careflow.com' OR name='Dr. Mahira';
UPDATE doctors SET name='Dr. Mahira', email='mahira@careflow.com', specialization='Pediatrics', experience=9, qualification='MBBS, MD Pediatrics', available=TRUE WHERE email='mahira@careflow.com' OR name='Dr. Mahira';

UPDATE users SET name='Dr. Ayesha', email='ayesha@careflow.com', password='doctor123', role='DOCTOR' WHERE email='ayesha@careflow.com' OR name='Dr. Ayesha';
UPDATE doctors SET name='Dr. Ayesha', email='ayesha@careflow.com', specialization='Neurology', experience=11, qualification='MBBS, DM Neurology', available=TRUE WHERE email='ayesha@careflow.com' OR name='Dr. Ayesha';

UPDATE users SET name='Demo Patient', email='patient@careflow.com', password='patient123', role='PATIENT' WHERE email='patient@careflow.com' OR name='Demo Patient';

SET SQL_SAFE_UPDATES = 1;

SELECT user_id,name,email,role FROM users ORDER BY user_id;
SELECT user_id,name,email,specialization FROM doctors ORDER BY user_id;
