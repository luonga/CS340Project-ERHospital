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

//Exports the router
module.exports = deletesRouter;