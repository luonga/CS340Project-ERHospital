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
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.get('/handle', function(req, res)
    {
        let query1 = "SELECT * FROM Medications;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('index', {data: rows});                  // Render the index.hbs file, and also send the renderer
        });                      
    });                                         

//Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});