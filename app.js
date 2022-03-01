'use strict';
/*
SETUP
*/

//Express
const PORT = 2324; 

const express = require("express");
const app = express();
const db = require('./database/db-connector');
const path = require('path');

// app.js - SETUP section
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {engine} = require('express-handlebars'); // Import express-handlebars

app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: 'main'
}));  // Create an instance of the handlebars engine to process templates

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    let query1 = "SELECT * FROM Medications;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {title: 'Handle', data: rows});                  // Render the index.hbs file, and also send the renderer
        });  
});

app.get('/medications', function(req, res)
    {
        let query1 = "SELECT * FROM Medications;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('medications', {title: 'Medications', data: rows});                  // Render the index.hbs file, and also send the renderer
        });                      
    });   

app.get('/doctors', function(req, res)
{
    let query1 = "SELECT doctorID, firstName, lastName, departmentID FROM Doctors;";               // Define our query
    let query2 = `SELECT departmentID, departmentName FROM Departments;`

    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        
        let doctors = rows;

        db.pool.query(query2, function(error, rows, fields){
            
            let deparments = rows;
            res.render('doctors', {title: 'Doctors', data: doctors, depts: deparments});
        })

    });                      
});

app.get('/departments', function(req, res)
{
    
    let query1 = "SELECT departmentID, departmentName, capacity FROM Departments;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('departments', {title: 'Departments', data: rows});                  // Render the index.hbs file, and also send the renderer
    });                      
});

app.get('/patients', function(req, res)
{
    let query1 = `SELECT patientID, firstName, lastName, 
    birthdate, isAdmitted, doctorID FROM Patients;`;          
    let query2 = `SELECT doctorID, firstName, lastName FROM Doctors;`

    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        let patients = rows;

        db.pool.query(query2, function(error, rows, fields){
            let doctors = rows;
            res.render('patients', {title: 'Patients', data: patients, docs: doctors}); 
        });

    });                      
});

app.get('/medpatients', function(req, res)
{
    let query1 = `SELECT firstName, lastName, MedPatients.patientID,
    MedPatients.medID, medName FROM MedPatients
    INNER JOIN Patients ON MedPatients.patientID = Patients.patientID
    INNER JOIN Medications ON MedPatients.medID = Medications.medID;`;
    let query2 = `SELECT firstName, lastName, patientID FROM Patients;`;
    let query3 = `SELECT medName, medID FROM Medications;`;

    db.pool.query(query1, function(error, rows, fields){    // Execute the query
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

app.post('/add-department-form', (req, res)=>{
    let query1 = `INSERT INTO Departments (departmentName, capacity)
    VALUES (?, ?);`
    let inserts = [req.body.departmentName, req.body.capacity]
    console.log(inserts)
    db.pool.query(query1, inserts, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/departments');
        }
    })
});

app.post('/add-doctor-form', (req, res)=>{
    let query1 = `INSERT INTO Doctors (firstName, lastName, departmentID)
    VALUES (?, ?, ?);`;
    let inserts = [req.body.firstName, req.body.lastName, req.body.departmentID];

    db.pool.query(query1, inserts, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/doctors');
        }
    });
});

app.post('/add-medication-form', (req, res)=>{
    let query1 = `INSERT INTO Medications (medName)
    VALUES (?);`;
    let inserts = [req.body.medName];

    db.pool.query(query1, inserts, function(error, rows, fields){
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/medications');
        }
    });

});

app.post('/add-patient-form', (req,res)=>{
    let query1 = `INSERT INTO Patients (firstName, lastName, birthdate, isAdmitted, doctorID) 
    VALUES (?, ?, ?, ?, ?);`
    let inserts = [
        req.body.firstName, 
        req.body.lastName, 
        req.body.birthdate, 
        req.body.isAdmitted, 
        req.body.doctorID];
    
    db.pool.query(query1, inserts, function(error, rows, fields){
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/patients');
        }
    });
});

app.post('/add-medpatient-form', (req, res)=>{
    let query1 = `INSERT INTO MedPatients (patientID, medID)
    VALUES (?, ?);`;
    let inserts = [
        req.body.patientID,
        req.body.medID
    ];

    db.pool.query(query1, inserts, function(error, rows, fields){
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/medpatients');
        }
    });

app.get('/handle/:id', (req, res)=>{
    console.log(req.params.id);
    res.send(req.body.params.id);
});

app.delete('/delete-department/:departmentID', (req, res)=>{
    console.log(req.params.departmentID);
    query1 = 'DELETE FROM Departments WHERE departmentID = ?;'
    inserts = [req.params.departmentID]
    

    db.pool.query(query1, inserts, (error, rows, fields) => {

        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/departments');
        }
    })
});

});

//Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});