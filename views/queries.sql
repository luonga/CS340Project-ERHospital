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
