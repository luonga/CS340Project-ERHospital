--Clear any existing database
--and create the tables.  

DROP TABLE IF EXISTS Patients;

CREATE TABLE Patients (
    patientID int(11) NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    birthdate DATE NOT NULL,
    isAdmitted TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (patientID)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Doctors;

CREATE TABLE Doctors (
    doctorID int(11) NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    PRIMARY KEY (doctorID)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Medications;

CREATE Medications (
    medID int(11) NOT NULL,
    medName varchar(255) NOT NULL,
    PRIMARY KEY (medID)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Departments;

CREATE Departments (
    departmentID int(11) NOT NULL,
    deparmentName varchar(255) NOT NULL,
    capacity int(11)
    PRIMARY KEY (departmentID)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS MedPatients;

CREATE TABLE MedPatients (
    medID int(11) NOT NULL,
    patientID int(11) NOT NULL,
    PRIMARY KEY (medID, patientID),
    CONSTRAINT medPat_fk_1 FOREIGN KEY medID REFERENCES Medications,
    CONSTRAINT medPat_fk_2 FOREIGN KEY patientID REFERENCES Patients
) ENGINE=InnoDB;

--Add the relationships between tables.  

ALTER TABLE Patients
ADD CONSTRAINT fk_pat FOREIGN KEY doctorID
REFERENCES Doctors ON DELETE CASCADE; 

ALTER TABLE Doctors
ADD CONSTRAINT fk_doc FOREIGN KEY departmentID
REFERENCES Departments ON DELETE CASCADE;



--Insert dummy values into the Patients table

INSERT INTO Patients (firstName, lastName, birthdate, isAdmitted)
VALUES ('Danny', 'Jennings', '1979-01-18', 1),
('Evan', 'Greer', '1985-06-12', 1),
('Alice', 'Tanner', '1992-11-12', 0);

INSERT INTO Doctors (firstName, lastName)
VALUES ('Gregory', 'House'),
('James', 'Wilson'),
('Lisa', 'Cuddy');

INSERT INTO Medications (medName)
VALUES ('Levothyroxine'),
('Lisinopril'),
('Metformin');

INSERT INTO Departments (deparmentName, capacity)
VALUES ('Radiology', 1000),
('Cardiology', 525),
('ICU', 1500);

