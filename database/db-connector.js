// ./database/db-connector.js

// Get an instance of mysql we can use in the app
const mysql = require('mysql');

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'us-cdbr-east-05.cleardb.net',
    user            : 'bcf22960d64331',
    password        : 'af3a1a1d',
    database        : 'heroku_aa7ea3d46f60f8e'
});

// Export it for use in our applicaiton
module.exports.pool = pool;
