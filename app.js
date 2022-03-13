'use strict';
/*
SETUP
*/


//Express
const PORT = 8305; 
const express = require("express");
const app = express();
const db = require('./database/db-connector');
const path = require('path');



//Router Variables
const reads = require('./routes/reads');
const creates = require('./routes/creates');
const deletes = require('./routes/deletes');
const updates = require('./routes/updates')


// app.js - SETUP section
app.use(express.json());
app.use(express.urlencoded({extended: true}));




//Set-up handlebars
const {engine} = require('express-handlebars'); // Import express-handlebars
app.set('view engine', '.hbs'); 
app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: 'main'
}));  




//Handle static content
app.use('/static', express.static(path.join(__dirname, 'public')));





//Home Page Route
app.get('/', function(req, res) {
    res.render('index', {title: 'ER Hospital Home Page'}); 
});   





//Middleware for main routes
app.use("/reads", reads);
app.use("/creates", creates);
app.use("/deletes", deletes);
app.use("/updates", updates);



//Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});