'use strict'; 
const express = require('express');
const db = require('../database/db-connector');
let createsRouter = express.Router();

//Create a new department
createsRouter
    .route('/add-department-form')
    .post((req, res) =>
        {
            let query1 = `INSERT INTO Departments (departmentName, capacity)
            VALUES (?, ?);`
            let inserts = [req.body.departmentName, req.body.capacity]
            console.log(inserts)
            db.pool.query(query1, inserts, function(error, rows, fields){
        
                // Check to see if there was an error
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }
        
                // Redirect to the departments read operation to reflect the new changes
                else
                {
                    res.redirect('/reads/departments');
                }
            })
        });

//Create a new doctor
createsRouter
    .route('/add-doctor-form')
    .post((req, res) =>
        {
            
            //Handle a null value for departmentID
            let query1;
            let inserts;
            if(Number.isInteger(req.body.departmentID)){
                query1 = `INSERT INTO Doctors (firstName, lastName, departmentID)
                VALUES (?, ?, ?);`;
                inserts = [req.body.firstName, req.body.lastName, req.body.departmentID];
            }
            else {
                query1 = `INSERT INTO Doctors (firstName, lastName)
                VALUES (?, ?);`;
                inserts = [req.body.firstName, req.body.lastName];
            }

            
            
        
            db.pool.query(query1, inserts, function(error, rows, fields){
                // Check to see if there was an error
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }
        
                //Redirect the doctors read operation to reflect changes
                else
                {
                    res.redirect('/reads/doctors');
                }
            });
        });


//Create a new medication
createsRouter
    .route('/add-medication-form')
    .post((req, res)=>
        {
            let query1 = `INSERT INTO Medications (medName)
            VALUES (?);`;
            let inserts = [req.body.medName];
        
            db.pool.query(query1, inserts, function(error, rows, fields){
                //Handle errors
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }
        
                // Redirect to the read medications operation to reflect changes.
                else
                {
                    res.redirect('/reads/medications');
                }
            });
        
        });

//Create a new patient
createsRouter
    .route('/add-patient-form')
    .post((req,res)=>
        {
            let isAdmitted = req.body.isAdmitted;
            let query1;
            let inserts;

            //Handle isAdmitted before sending to database
            if (isAdmitted === 'on') {
                isAdmitted = 'True'
            } else {
                isAdmitted = 'False'
            }
            
            console.log(req.body.doctorID)
            let doctorID = parseInt(req.body.doctorID)
            //Handle doctorID if it is not an integer.  
            if (Number.isInteger(doctorID))
            {
                query1 = `INSERT INTO Patients (firstName, lastName, birthdate, isAdmitted, doctorID) 
                VALUES (?, ?, ?, ?, ?);`;
                inserts = [
                    req.body.firstName, 
                    req.body.lastName, 
                    req.body.birthdate, 
                    isAdmitted, 
                    req.body.doctorID
                ];
            } 
            else {
                query1 = `INSERT INTO Patients (firstName, lastName, birthdate, isAdmitted) 
                VALUES (?, ?, ?, ?);`;
                inserts = [
                    req.body.firstName, 
                    req.body.lastName, 
                    req.body.birthdate, 
                    isAdmitted
                ];
            }
            
            
            
            db.pool.query(query1, inserts, function(error, rows, fields){
                    if (error) {
                        console.log(error)
                        res.sendStatus(400);
                    }
                    //Redirects to patients read operation to reflect changes.
                    else
                    {
                        res.redirect('/reads/patients');
                    }
            });
        });


//Create a new medPatient
createsRouter
    .route('/add-medpatient-form')
    .post((req, res) =>
        {
            let query1 = `INSERT INTO MedPatients (patientID, medID)
            VALUES (?, ?);`;
            let inserts = [
                req.body.patientID,
                req.body.medID
            ];
        
            db.pool.query(query1, inserts, function(error, rows, fields){
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }
        
                // Redirects to the medpatient read operation to reflect changes.
                else
                {
                    res.redirect('/reads/medpatients');
                }
            });
        });


//Exports the router
module.exports = createsRouter;