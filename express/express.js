/* Core Module Imports */
const http = require("http");

/* 3rd Party Imports */
const express = require('express');


const app = express();
app.use((req, res, next) => {
    console.log('In the express middleware!');
    next();
});

app.use((req, res, next) => {
    console.log('In the second express middleware!');
});

const server = http.createServer(app);
server.listen(3000);