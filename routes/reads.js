'use strict'; 
const express = require('express');
const db = require('../database/db-connector');
let readsRouter = express.Router();

readsRouter
    //Read all the medications in database
    .route('/medications')
    .get((req, res) =>
        {
            let query1 = "SELECT * FROM Medications;";               

            db.pool.query(query1, function(error, rows, fields){    

                res.render('medications', {title: 'Medications', data: rows});                  
            });                      
        });



module.exports = readsRouter;