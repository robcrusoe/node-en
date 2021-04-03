/* Core Module Imports */
const http = require('http');
const path = require('path');

/* 3rd Party Imports */
const express = require('express');
const favicon = require('serve-favicon')


const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use((req, res, next) => {
    console.log('In the express middleware!');
    next(); // Allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
    console.log('In the second express middleware!');
    res.status(200).send('<h1>Hello from Express!</h1>');
});

const server = http.createServer(app);
server.listen(3000);