'use strict'; 
const express = require('express');
const db = require('../database/db-connector');
let updatesRouter = express.Router();
let alert = require('alert');

//Update a department
updatesRouter
    .route('/update-department/:departmentID')
    .put((req,res)=>
        {
            let query1 = `UPDATE Departments SET departmentName= ?, 
            capacity= ? WHERE departmentID = ?;`;
            let inserts = [
                req.body.departmentName,
                req.body.capacity,
                req.params.departmentID
            ];

            db.pool.query(query1, inserts, (error, rows, fields)=>{
                if(error) {
                    res.sendStatus(400)
                }
                else {
                    res.status(200).end()
                }
            })


        });

//Update Doctor
updatesRouter
    .route('/update-doctor/:doctorID')
    .put((req,res)=>
        {
            let query1 = `UPDATE Doctors SET firstName = ?, lastName = ?, departmentID = ?
            WHERE doctorID = ?;`
            let inserts = [
                req.body.firstName,
                req.body.lastName,
                req.body.departmentID,
                req.params.doctorID
            ];

            db.pool.query(query1, inserts, (error, rows, fields)=>{
                if(error){
                    res.sendStatus(400)
                }
                else {
                    res.status(200).end()
                }
            })
        });

//Update Medication
updatesRouter
    .route('/update-medication/:medID')
    .put((req,res)=>
        {
            let query1 = `UPDATE Medications SET medName = ? 
            WHERE medID = ?;`;
            let inserts = [
                req.body.medName,
                req.params.medID
            ];

            db.pool.query(query1, inserts, (error, rows, fields)=>{
                if (error) {
                    res.sendStatus(400)
                }
                else {
                    res.status(200).end()
                }
            });

        });

      
//Update Patient
updatesRouter
    .route('/update-patient/:patientID')
    .put((req,res)=>
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

            let doctorID = parseInt(req.body.doctorID)
            //Handle if doctorID is NULL
            if(Number.isInteger(doctorID)){
                query1 = `UPDATE Patients SET firstName = ?, 
                lastName = ?, birthdate = ?, 
                isAdmitted = ?, doctorID = ? 
                WHERE patientID = ?`
                inserts = [
                    req.body.firstName,
                    req.body.lastName,
                    req.body.birthdate,
                    isAdmitted,
                    req.body.doctorID,
                    req.params.patientID
                ]
            }
            else {
                query1 = `UPDATE Patients SET firstName = ?, 
                lastName = ?, birthdate = ?, 
                isAdmitted = ?, doctorID = NULL 
                WHERE patientID = ?`
                inserts = [
                    req.body.firstName,
                    req.body.lastName,
                    req.body.birthdate,
                    isAdmitted,
                    req.params.patientID
                ]
            }
            
            
            db.pool.query(query1, inserts, (error, rows, fields)=>{
                if(error){
                    res.sendStatus(400)
                }
                else{
                    res.status(200).end()
                }
            })
        });


//Update MedPatient
updatesRouter
    .route('/update-medPatient/:medID/:patientID')
    .put((req,res)=>
        {
            let query1 = `UPDATE MedPatients 
            SET patientID = ?, medID = ?
            WHERE (medID, patientID) = (?,?);`;
            let inserts = [
                req.body.patientID,
                req.body.medID,
                req.params.medID,
                req.params.patientID
            ];
            console.log(inserts)
            db.pool.query(query1, inserts, (error, rows, fields)=>{
                if(error){
                    alert('This patient has already been assigned this medication')
                }
                else{
                    res.status(200).end()
                }
            })
        });


//Exports the router
module.exports = updatesRouter;