--Clear any existing database
  
DROP TABLE IF EXISTS MedPatients;
DROP TABLE IF EXISTS Patients;
DROP TABLE IF EXISTS Doctors;
DROP TABLE IF EXISTS Medications;
DROP TABLE IF EXISTS Departments;

--Create the tables.
CREATE TABLE Patients (
    patientID int(11) NOT NULL AUTO_INCREMENT,
    doctorID int(11),
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    birthdate DATE NOT NULL,
    isAdmitted ENUM('True', 'False') NOT NULL,
    -- isAdmitted TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (patientID)
) ENGINE=InnoDB;



CREATE TABLE Doctors (
    doctorID int(11) NOT NULL AUTO_INCREMENT,
    departmentID int(11),
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    PRIMARY KEY (doctorID)
) ENGINE=InnoDB;



CREATE TABLE Medications (
    medID int(11) NOT NULL AUTO_INCREMENT,
    medName varchar(255) NOT NULL,
    PRIMARY KEY (medID)
) ENGINE=InnoDB;



CREATE TABLE Departments (
    departmentID int(11) NOT NULL AUTO_INCREMENT,
    departmentName varchar(255) NOT NULL,
    capacity int(11),
    PRIMARY KEY (departmentID)
) ENGINE=InnoDB;

CREATE TABLE MedPatients (
    medID int(11) NOT NULL,
    patientID int(11) NOT NULL,
    PRIMARY KEY (medID, patientID),
    CONSTRAINT fk_mid FOREIGN KEY (medID) REFERENCES Medications (medID)
    ON DELETE CASCADE,
    CONSTRAINT fk_pid FOREIGN KEY (patientID) REFERENCES Patients (patientID)
    ON DELETE CASCADE
) ENGINE=InnoDB;

--Add the relationships between tables.  

ALTER TABLE Patients
ADD CONSTRAINT fk_pat FOREIGN KEY (doctorID)
REFERENCES Doctors(doctorID) ON DELETE SET NULL; 

ALTER TABLE Doctors
ADD CONSTRAINT fk_doc FOREIGN KEY (departmentID)
REFERENCES Departments(departmentID) ON DELETE SET NULL;



--Insert dummy values into the Patients table

INSERT INTO Departments (departmentName, capacity)
VALUES ('Radiology', 1000),
('Cardiology', 525),
('ICU', 1500);

INSERT INTO Doctors (firstName, lastName, departmentID)
VALUES ('Gregory', 'House', 3),
('James', 'Wilson', 2),
('Lisa', 'Cuddy', 2);

INSERT INTO Patients (firstName, lastName, birthdate, isAdmitted, doctorID)
VALUES ('Danny', 'Jennings', '1979-01-18', 'True', 3),
('Evan', 'Greer', '1985-06-12', 'True', 3),
('Alice', 'Tanner', '1992-11-12', 'False', 1);

INSERT INTO Medications (medName)
VALUES ('Levothyroxine'),
('Lisinopril'),
('Metformin');

INSERT INTO MedPatients (patientID, medID)
VALUES (3,1), (2,1), (3,2), (1,3);



