/* Core Module Imports */
const path = require("path");

/* 3rd Party Imports */
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");

/* App Imports */
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

/* Controller Imports */
const errorController = require('./controllers/error');

const app = express();

/* Setting up global configuration values ... */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

/* Resgistering a (req) body parser ... */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3210);
