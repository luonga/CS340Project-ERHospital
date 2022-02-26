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

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('doctors', {title: 'Doctors', data: rows});                  // Render the index.hbs file, and also send the renderer
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
    birthdate, isAdmitted, doctorID FROM Patients;`;               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('patients', {title: 'Patients',data: rows});                  // Render the index.hbs file, and also send the renderer
    });                      
});

app.get('/medpatients', function(req, res)
{
    let query1 = `SELECT firstName, lastName, MedPatients.patientID,
    MedPatients.medID, medName FROM MedPatients
    INNER JOIN Patients ON MedPatients.patientID = Patients.patientID
    INNER JOIN Medications ON MedPatients.medID = Medications.medID;`;

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('medpatients', {title: 'Med-Patients',data: rows});                  // Render the index.hbs file, and also send the renderer
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

//Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});