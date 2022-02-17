--Clear any existing Patients database
--and create the Patients table.  

DROP TABLE IF EXISTS Patients;

CREATE TABLE Patients (
    patientID int(11) NOT NULL AUTO_INCREMENT,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    birthdate DATE NOT NULL,
    isAdmitted TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (patientID)
) ENGINE=InnoDB;

--Insert dummy values into the Patients table

INSERT INTO Patients (firstName, lastName, birthdate, isAdmitted)
VALUES ('Danny', 'Jennings', '1979-01-18', 1),
('Evan', 'Greer', '1985-06-12', 1),
('Alice', 'Tanner', '1992-11-12', 0);
