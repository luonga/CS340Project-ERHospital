'use strict'; 
const express = require('express');
const db = require('../database/db-connector');
let updatesRouter = express.Router();

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


//Exports the router
module.exports = updatesRouter;