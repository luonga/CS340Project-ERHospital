'use strict';
/*
SETUP
*/

//Express
const PORT = 2324; 

const express = require("express");
const app = express();
const db = require('./database/db-connector')

app.use(express.static('public'));

const { engine } = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs", defaultLayout: 'main'}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.get('/medications', function(req, res)
    {
        let query1 = "SELECT * FROM Medications;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('medications', {data: rows});                  // Render the index.hbs file, and also send the renderer
        });                      
    });   

app.get('/doctors', function(req, res)
{
    let query1 = "SELECT firstName, lastName, departmentID FROM Doctors;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('doctors', {data: rows});                  // Render the index.hbs file, and also send the renderer
    });                      
});

app.get('/departments', function(req, res)
{
    let query1 = "SELECT departmentID, departmentName, capacity FROM Departments;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('departments', {data: rows});                  // Render the index.hbs file, and also send the renderer
    });                      
});

app.get('/patients', function(req, res)
{
    let query1 = "SELECT patientID, firstName, lastName, birthdate, isAdmitted, doctorID FROM Patients;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('patients', {data: rows});                  // Render the index.hbs file, and also send the renderer
    });                      
});

app.get('/medpatients', function(req, res)
{
    let query1 = "SELECT firstName.Patients, lastName.Patients, patientID, medID, medName.Medications FROM MedPatients INNER JOIN Patients ON patientID.MedPatients = patientID.Patients INNER JOIN Medications ON medID.MedPatients = medID.Medications;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('medpatients', {data: rows});                  // Render the index.hbs file, and also send the renderer
    });                      
});

//Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});