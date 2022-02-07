'use strict';
/*
SETUP
*/

//Express
const PORT = 2324; 

const express = require("express");
const app = express();

app.use(express.static('public'));

// app.get("/", function(req,res){
//     res.send("Hello World!");
// })

//Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});