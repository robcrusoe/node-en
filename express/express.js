/* Core Module Imports */
const path = require("path");

/* 3rd Party Imports */
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const nodeTo = require("@robcrusoe/node-to");

/* Imports for express-handlebars */
const expressHbs = require('express-handlebars');

/* App Imports */
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

/* Register a new templating engine */
app.engine('handlebars', expressHbs());

/* Setting up global configuration values ... */
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, 'views'));

/* Resgistering a (req) body parser ... */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: 'Page Not Found!', path: null });
  nodeTo.printMessage();
});

app.listen(3000);
