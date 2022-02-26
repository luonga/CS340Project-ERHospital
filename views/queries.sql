-- Department Page

-- Main Department table

-- Department Read operation
SELECT departmentID, departmentName, capacity 
FROM Departments;

-- Department Create operation from input fields.
INSERT INTO Departments (departmentName, capacity)
VALUES (:deparmentNameInput, :capacityInput);

-- Department Update operation.  
UPDATE Departments SET deparmentName=:deparmentNameInput, capacity=:capacityInput WHERE departmentNameID = :departmentIDForm;

-- Department Delete operation

DELETE FROM Departments WHERE departmentID =: departmentIDfromTable;

-- Doctors Page

-- Doctors Table
SELECT firstName, lastName, departmentID FROM Doctors;

-- Doctor Create Form
INSERT INTO Doctors (firstName, lastName, departmentID)
VALUES (:firstNameInput, :lastNameInput, :departmentIDfromDropdownList);

-- Update Doctor
UPDATE Doctors SET firstName = :firstNameInput, lastName = :lastNameInput, departmentID = :departmentIDfromDropdownList
WHERE doctorID = :doctorIDfromForm;

-- Delete Doctor
DELETE FROM Doctors WHERE doctorID = :doctorIDfromTable;

-- Medication Page

-- Medication Table
SELECT medID, medName FROM Medications;

-- Create Medication Form
INSERT INTO Medications (medName)
VALUES (:medNameInput);

-- Update medication
UPDATE Medications SET medName = :medNameFromInput WHERE medID = :medIDfromForm;

-- Delete Medication
DELETE FROM Medications WHERE medID = :medIDfromTable;

-- Medication Patient Page

-- Medication Table 
SELECT medID, medName FROM Medications;

-- Patient Table
SELECT patientID, firstName, lastName, birthdate, isAdmitted, doctorID FROM Patients;

-- Medication Patient Table
SELECT firstName.Patients, lastName.Patients, patientID, medID, medName.Medications
FROM MedPatients INNER JOIN Patients ON patientID.MedPatients = patientID.Patients
INNER JOIN Medications ON medID.MedPatients = medID.Medications; 

-- Create a new entry in the MedPatients table
INSERT INTO MedPatients (patientID, medID)
VALUES (:patientIDfromInput, :medIDfromInput);

-- Update the MedPatients table
UPDATE MedPatients SET patientID = :patientIDfromUpdateInput, medID = :medIDfromUpdateInput
WHERE (medID, patientID) = (:medIDfromInput,:patientIDfromInput);

-- Delete a connection
DELETE FROM MedPatients WHERE (medID, patientID) = (:medIDfromTable, :patientIDfromTable);

-- Patient page

-- Patient Table
SELECT patientID, firstName, lastName, birthdate, isAdmitted, doctorID FROM Patients;

-- Create Patient
INSERT INTO Patients (firstName, lastName, birthdate, isAdmitted, doctorID) VALUES
(:firstNameInput, :lastNameInput, birthdateInput, isAdmittedInput, doctorIDinput);

-- Update Patient
UPDATE Patients SET firstName = :firstNameFromInput, 
lastName = :lastNameFromInput, birthdate = :birthdateInput, 
isAdmitted = :isAdmittedInput, doctorID = :doctorIDinput 
WHERE patientID = patientIDfromForm; 

-- Delete Patient
DELETE FROM Patients WHERE patientID = :patientIDfromTable; 
