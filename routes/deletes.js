'use strict'; 
const express = require('express');
const db = require('../database/db-connector');
let deletesRouter = express.Router();

//Delete a department
deletesRouter
    .route('/delete-department/:departmentID')   
    .delete((req,res)=>
        {
            console.log(req.params);
            let query1 = 'DELETE FROM Departments WHERE departmentID = ?;'
            let inserts = [req.params.departmentID]

            db.pool.query(query1, inserts, (error,rows,fields)=>{
                if(error) {
                    res.sendStatus(400);
                }
                else {
                    res.status(200).end();
                }
            })
        
        });

//Delete a doctor
deletesRouter
    .route('/delete-doctor/:doctorID')
    .delete((req, res) => 
        {
           console.log(req.params);
           let query1 = 'DELETE FROM Doctors WHERE doctorID = ?;';
           let inserts = [req.params.doctorID];

           db.pool.query(query1, inserts, (error, rows, fields) => {
               if(error) {
                   res.sendStatus(400);
               } 
               else {
                   res.status(200).end();
               }
           })
        });

//Delete a medication
deletesRouter
    .route('/delete-medication/:medID')
    .delete((req,res)=>
        {
            console.log(req.params.medID)
            let query1 = 'DELETE FROM Medications WHERE medID = ?;';
            let inserts = [req.params.medID];

            db.pool.query(query1, inserts, (error, rows, fields) => {
                if(error) {
                    res.sendStatus(400);
                }
                else {
                    res.status(200).end();
                }
            })
        });

//Delete a patient
deletesRouter
    .route('/delete-patient/:patientID')
    .delete((req,res)=>
        {
            console.log(req.params)
            let query1 = 'DELETE FROM Patients WHERE patientID = ?';
            let inserts = [req.params.patientID];

            db.pool.query(query1, inserts, (error, rows, fields) => {
                if(error) {
                    res.sendStatus(400);
                }
                else {
                    res.status(200).end();
                }
            })
        });

//Delete a medPatient
deletesRouter
    .route('/delete-medPatient/:medID/:patientID')
    .delete((req,res)=>
        {
            console.log(req.params)

            let query1 = 'DELETE FROM MedPatients WHERE (medID, patientID) = (?, ?);';
            let inserts = [
                req.params.medID,
                req.params.patientID
            ];

            db.pool.query(query1, inserts, (error, rows, fields)=>{
                if(error) {
                    res.sendStatus(400);
                }
                else {
                    res.status(200).end();
                }
            })
        });

//Exports the router
module.exports = deletesRouter;