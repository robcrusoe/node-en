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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/* Wire up a mock User */
app.use((req, res, next) => {
  User.findById('608ecce51dfbeb33d388e4a0').then(user => {
    req.user = user;
    next();
  }).catch(error => {
    console.log('Error fetching User from DB: ', error);
  });
});

mongoose.connect('mongodb+srv://robcrusoe:j8KLWdQCCKH13wJz@cluster-fb-0.vkg7v.mongodb.net/shop?retryWrites=true&w=majority').then(result => {
  // const user = new User({
  //   name: 'Arka Sain',
  //   email: 'arka.sain@aol.com',
  //   cart: {
  //     items: []
  //   }
  // });

  // user.save();
  app.listen(3210);
}).catch(error => {
  console.log('DB Connection Error | Mongoose: ', error);
});