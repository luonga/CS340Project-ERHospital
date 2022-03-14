

Link to project:

https://erhospital.herokuapp.com/


Project Outline

The hospital’s administration is currently having issues with managing their rapidly growing staff, patients, and medications.  Our database keeps track of the patients that doctors are assigned to and what medications the patients are potentially using and also which doctors are assigned to which department.  This database is useful for doctors to see which patients they currently are assigned to and what medications their patient is currently taking.  It is also useful for a hospital administrator to see how the doctors are allocated to departments and how many patients each doctor is assigned to.  This feature can be useful for finding solutions to staffing issues.  It will ensure that each patient will receive the proper attention and care.  
 
Our database will be used by a medium-sized hospital with roughly 100 doctors.  Each doctor will be assigned to either zero or more patients.  The hospital administrator will try to balance the number of patients assigned to a doctor, so as not to burn out a particular doctor at any given time.  There are 10 departments within our hospital and each department can hold between 50-100 patients and have multiple doctors assigned to it. Our hospital has 1000 unique medications that can be used to treat our patients when they stay with us.   Our database keeps track of all patients admitted to the hospital and keeps track of if the patient is currently admitted or not.  This will save the patient’s data to make it easier if they reenter the hospital or if someone needs to look up their medical history.  This feature will also allow the hospital to analyze patients’ data and see trends of admittance, medications, discharge, etc.  The patient can request that their info and previous history be deleted.  
 
 
 
Database Outline

Patients: records the details of an individual patient currently in the hospital.  It also records if the patient is currently admitted to the hospital or not.  Each patient is assigned one doctor.  A patient can be reassigned to another doctor and this can be updated in the database.  A patient can be prescribed many medications or none.  Prescriptions can be added and deleted during their treatment at the hospital.  The patient can also be deleted from the database if they fill-out a form requesting this.  
patientID: int, auto_increment, unique, not NULL, PK
firstName: varchar, not NULL
lastName: varchar, not NULL
birthdate: date, not NULL
isAdmitted: varchar, Default False
Relationship: a 1:M relationship between Doctors and Patients, and a M:M relationship between Patients and Medications

Doctors: records the details of the doctor.  A doctor may have several patients or none.  Each doctor is assigned to one department and a department can have multiple doctors.  
doctorID: int, auto_increment, unique, not NULL, PK
firstName: varchar, not NULL
lastName: varchar, not NULL
Relationship: a 1:M relationship between Doctors and Patients, 1:M relationship between Departments and Doctors.

Medications: records the name of the medications that are currently being prescribed to our patients.  Multiple patients can be prescribed the same medication.  A patient can also be on multiple medications.
medID: int, auto_increment, unique, not NULL, PK
medName: varchar, not NULL
Relationship: a M:M relationship between Medications and Patients

Departments: records the details of different Departments within the hospital.  A department can have multiple doctors or no doctors.  Each department also has a maximum capacity of patients it can handle.
departmentID: int, auto_increment, unique, not NULL, PK
departmentName: varchar, not NULL
capacity: int, not NULL
Relationship: a 1:M relationship between Departments and Doctors

Relationship Table
MedPatients: relationship table to record M:M relationship between Medications and Patients
medID: int, auto_increment, unique, not NULL, FK
patientID: int, auto_increment, unique, not NULL, FK


Entity-Relationship Diagram:


<img width="299" alt="ER Diagram" src="https://user-images.githubusercontent.com/53350691/158246482-b933ee91-1764-4233-8450-fe6898ea13d0.PNG">



Schema

<img width="316" alt="ER Diagram (1)" src="https://user-images.githubusercontent.com/53350691/158246449-cbb4b22d-cc8f-44d3-adfc-1c68cb67c17b.PNG">



UI Screenshots
Homepage:
<img width="953" alt="homepage" src="https://user-images.githubusercontent.com/53350691/158244555-130beaa1-91e1-48ff-9697-81cef506b2bc.PNG">

Add/Edit Departments

<img width="959" alt="Departments" src="https://user-images.githubusercontent.com/53350691/158244567-45510b6d-63dc-4ccf-91f1-838a5a765a13.PNG">



Add/Edit Doctors
<img width="949" alt="Doctors" src="https://user-images.githubusercontent.com/53350691/158244576-565949b9-6cb2-49b8-9b93-61f78bdb5a43.PNG">

Add/Edit Medications

<img width="957" alt="Medications" src="https://user-images.githubusercontent.com/53350691/158244584-93226718-f140-4a1f-9dda-1089326e91f2.PNG">








Add/Edit/Search Patients
<img width="960" alt="Patients" src="https://user-images.githubusercontent.com/53350691/158244594-ded80394-c29e-4992-9eda-378edc8d21ce.PNG">

Connect a Medication to a Patient:
<img width="957" alt="MedPatients" src="https://user-images.githubusercontent.com/53350691/158244595-97805da8-d60b-4004-b26a-fecad1f3efee.PNG">

