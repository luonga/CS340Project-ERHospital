'use strict'; 
const express = require('express');
const res = require('express/lib/response');
const db = require('../database/db-connector');
let readsRouter = express.Router();

//Return Everything reads

//Read and return all the medications in database
readsRouter
    .route('/medications')
    .get((req, res) =>
        {
            let query1 = "SELECT * FROM Medications;";               

            db.pool.query(query1, function(error, rows, fields){    

                res.render('medications', {title: 'Medications', data: rows});                  
            });                      
        });

//Reads and return all the doctors in the database
readsRouter 
    .route('/doctors')
    .get((req, res)=>
        {
            let query1 = "SELECT doctorID, firstName, lastName, departmentID FROM Doctors;";               
            let query2 = `SELECT departmentID, departmentName FROM Departments;`;

            db.pool.query(query1, function(error, rows, fields){    
                
                let doctors = rows;

                db.pool.query(query2, function(error, rows, fields){
                    
                    let deparments = rows;
                    res.render('doctors', {title: 'Doctors', data: doctors, depts: deparments});
                })

            });                      
        });

//Read and return all the departments in the database
readsRouter
    .route('/departments')
    .get((req, res) =>
        {  
            let query1 = "SELECT departmentID, departmentName, capacity FROM Departments;";               

            db.pool.query(query1, function(error, rows, fields){    

                res.render('departments', {title: 'Departments', data: rows});                  
            });                      
        });

//Read and return all the patients in the database
readsRouter
    .route('/patients')
    .get((req, res) => 
        {
            let query1 = `SELECT patientID, firstName, lastName, 
            birthdate, isAdmitted, doctorID FROM Patients;`;          
            let query2 = `SELECT doctorID, firstName, lastName FROM Doctors;`

            db.pool.query(
                {
                    sql: query1, 
                    typeCast: function(field, next) {
                        if(field.type === 'DATE') {
                            return field.string() 
                        } else {
                            return next()
                            
                        }
                    }
                }, function(error, rows, fields){   
                let patients = rows;

                db.pool.query(query2, function(error, rows, fields){
                    let doctors = rows;
                    res.render('patients', {title: 'Patients', data: patients, docs: doctors}); 
                });

            });                      
        });

//Read and return all medPatients from database
readsRouter
    .route('/medpatients')
    .get((req, res) =>
        {
            let query1 = `SELECT firstName, lastName, MedPatients.patientID,
            MedPatients.medID, medName FROM MedPatients
            INNER JOIN Patients ON MedPatients.patientID = Patients.patientID
            INNER JOIN Medications ON MedPatients.medID = Medications.medID;`;
            let query2 = `SELECT firstName, lastName, patientID FROM Patients;`;
            let query3 = `SELECT medName, medID FROM Medications;`;

            db.pool.query(query1, function(error, rows, fields){    
                let medpats = rows;

                db.pool.query(query2, function(error, rows, fields){
                    let patients = rows;
                    db.pool.query(query3, function(error, rows, fields){
                        let medications = rows;
                        res.render('medpatients', {
                            title: 'Med-Patients',
                            data: medpats,
                            pats: patients,
                            meds: medications
                        });
                    });
                });
            });                      
        });

//Single Reads

//Read and return a single department.
readsRouter
    .route('/singleDepartment/:departmentID')
    .get((req,res)=>
        {
            let query1 = `SELECT departmentID, departmentName, capacity 
            FROM Departments WHERE departmentID = ?`;
            let inserts = [
                req.params.departmentID
            ];

            db.pool.query(query1, inserts, (error, rows, fields)=>{

                if(error){
                    res.sendStatus(400)
                }
                else {
                    let department = rows
                    res.render('updateDepartment', {title: 'Update Dept', data: department})
                }
            })
        });


//Read and return a single doctor
readsRouter
    .route('/singleDoctor/:doctorID')
    .get((req,res)=>
        {
            let query1 = `SELECT doctorID, firstName, lastName, departmentID FROM Doctors
            WHERE doctorID = ?;`;
            let query2 = `SELECT departmentID, departmentName FROM Departments;`;
            let inserts = [req.params.doctorID]

            db.pool.query(query1, inserts, (error, rows, fields)=>{
                let doctor = rows;
                db.pool.query(query2, (error, rows, fields)=>{
                    let departments = rows;
                    res.render('updateDoctor', {title: 'Update Doc', data: doctor, depts: departments})
                });
            });
        });

//Read and return a single medication
readsRouter
    .route('/singleMedication/:medID')
    .get((req,res)=>
        {
            let query1 = `SELECT medID, medName FROM Medications
            WHERE medID = ?;`;
            let inserts = [
                req.params.medID
            ];

            db.pool.query(query1, inserts, (error, rows, fields)=>{
                let medication = rows;

                if(error){
                    res.sendStatus(400);
                }
                else {
                    res.render('updateMedication', {title: 'Update Med', data: medication});
                }
            });
        });

//Read and return a single patient
readsRouter
    .route('/singlePatient/:patientID')
    .get((req,res)=>
        {
            let query1 = `SELECT patientID, firstName, lastName, 
            birthdate, isAdmitted, doctorID FROM Patients
            WHERE patientID = ?;`;
            let query2 = `SELECT doctorID, firstName, lastName FROM Doctors;`;
            let inserts = [
                req.params.patientID
            ];

            db.pool.query(
                {
                    sql: query1, 
                    values: inserts,

                    //Cast the DATE field as a string to put it into the 
                    //appropriate format for the updatePatient form. 
                    typeCast: function(field, next) {
                        if(field.type === 'DATE') {
                            return field.string() 
                        } else {
                            return next()
                            
                        }
                    }
                }, (error, rows, fields)=>{

                    //Handle the isAdmitted to display the appropriate tags on the 
                    //updatePatient .hbs
                    let patient = rows;
                    let isAdmitted = patient[0].isAdmitted;
                    
                    if (isAdmitted === 1) {
                        isAdmitted = true
                    } else {
                        isAdmitted = false
                    }


                db.pool.query(query2, (error, rows, fields)=>{
                    let doctors = rows;

                    if(error) {
                        res.sendStatus(400)
                    }
                    else {
                        console.log(patient)
                        res.render('updatePatient', 
                            {
                                title: 'Update Patient', 
                                data: patient, 
                                docs: doctors, 
                                isAdm: isAdmitted
                            });
                    }
                });
            });
        });
//Read and return a single medpatient


//Searches the Patients by last name
readsRouter 
    .route('/search')
    .get((req,res)=>
        {
            let query1 = `SELECT patientID, firstName, lastName, 
            birthdate, isAdmitted, doctorID FROM Patients WHERE lastName = "${req.query.lname}";`;          
            let query2 = `SELECT doctorID, firstName, lastName FROM Doctors;`
            
            db.pool.query(query1, function(error, rows, fields){   
                let patients = rows;

                db.pool.query(query2, function(error, rows, fields){
                    let doctors = rows;
                    res.render('patients', {title: 'Patients', data: patients, docs: doctors}); 
                });

            });                      
        });



//Exports the router
module.exports = readsRouter;