
//import express into our project
const express = require('express');

//lets specify the database file we working with
//all database operations comes from this

const dbRouter = require('./data/db-router.js');

//lets create the server
const server = express();

//middleware
server.use(express.json());//converts data to JSON
server.use('/api/posts/', dbRouter);



server.get('/',(req,res) => {
    res.send('<h1>Welcome to the Project Database 01</h1>')
});




//hook it up to index.js
module.exports = server;
