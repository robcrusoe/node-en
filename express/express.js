/* Core Module Imports */
const path = require('path');

/* 3rd Party Imports */
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/* App Imports */
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/* Controller Imports */
const errorController = require('./controllers/error');

/* Model Imports */
const User = require('./models/user');

const app = express();

/* Setting up global configuration values ... */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Resgistering a (req) body parser ... */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/* Wire up a new mock User */
app.use((req, res, next) => {
  User.findById('608e60c14d47900443518cc9').then(user => {
    // console.log('Current User: ', user);

    req.user = new User(user.name, user.email, user.cart, user._id);
    next();
  }).catch(error => {
    console.log('Error while fetching User from DB: ', error);
  });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://robcrusoe:j8KLWdQCCKH13wJz@cluster-fb-0.vkg7v.mongodb.net/shop?retryWrites=true&w=majority').then(result => {
  app.listen(3210);
}).catch(error => {
  console.log('DB Connection Error | Mongoose: ', error);
});