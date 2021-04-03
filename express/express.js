/* Core Module Imports */
const http = require('http');
const path = require('path');

/* 3rd Party Imports */
const express = require('express');
const favicon = require('serve-favicon')


const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/add-product', (req, res, next) => {
    res.status(200).send('<h1>Add Products</h1>');
});

app.use('/', (req, res, next) => {
    res.status(200).send('<h1>Welcome!</h1>');
});

app.listen(3000);