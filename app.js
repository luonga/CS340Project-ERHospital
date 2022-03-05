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

//Router Variables
const reads = require('./routes/reads');

// app.js - SETUP section
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Set-up handlebars
const {engine} = require('express-handlebars'); // Import express-handlebars

app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: 'main'
}));  // Create an instance of the handlebars engine to process templates

//Handle static content
app.use('/static', express.static(path.join(__dirname, 'public')));

//Home Page Route
app.get('/', function(req, res) {
    res.render('index', {title: 'ER Hospital Home Page'}); 
});   

//Middleware for main routes
app.use("/reads", reads);

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
            res.redirect('/reads/departments');
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
            res.redirect('/reads/doctors');
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
            res.redirect('/reads/medications');
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
            res.redirect('/reads/patients');
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
            res.redirect('/reads/medpatients');
        }
    });
});


//delete a department
app.delete('/delete-department/:departmentID', (req,res)=>{
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


//Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});