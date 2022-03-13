// ./database/db-connector.js

// Get an instance of mysql we can use in the app
const mysql = require('mysql');

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_luongan',
    password        : '1733',
    database        : 'cs340_luongan'
});

// Export it for use in our applicaiton
module.exports.pool = pool;