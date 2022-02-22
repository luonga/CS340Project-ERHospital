-- Department Page

-- Main Department table

-- Department Read operation
SELECT departmentID, deparmentName, capacity 
FROM Departments;

-- Department Create operation from input fields.
INSERT INTO Departments (deparmentName, capacity)
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
UPDATE Doctors SET firstName = :firstNameInput, lastName = :lastNameInput, departmentID = :departmentIDfromDropdownList;

-- Delete Doctor
DELETE FROM Doctors WHERE doctorID = :doctorIDfromTable;

