/* Core Module Imports */
const path = require("path");

/* 3rd Party Imports */
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const nodeTo = require("@robcrusoe/node-to");

/* App Imports */
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

/* Resgistering a (req) body parser ... */
app.use(bodyParser.urlencoded({ extended: false }));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  nodeTo.printMessage();
});

app.listen(3000);
