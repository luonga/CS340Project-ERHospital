'use strict'; 
const express = require('express');
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
            let query2 = `SELECT departmentID, departmentName FROM Departments;`

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

            db.pool.query(query1, function(error, rows, fields){   
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


//Exports the router
module.exports = readsRouter;