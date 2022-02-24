'use strict';
/*
SETUP
*/

//Express
const PORT = 2324; 

const express = require("express");
const app = express();

app.use(express.static('public'));

const { engine } = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.get('/handle', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.

//Listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});