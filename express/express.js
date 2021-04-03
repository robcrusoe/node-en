/* Core Module Imports */
const path = require("path");

/* 3rd Party Imports */
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");

/* App Imports */
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

/* Resgistering a (req) body parser ... */
app.use(bodyParser.urlencoded({ extended: false }));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found ...</h1>');
});

app.listen(3000);
