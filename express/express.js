/* Core Module Imports */
const path = require('path');

/* 3rd Party Imports */
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

/* App Imports */
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

/* Controller Imports */
const errorController = require('./controllers/error');

/* Database Imports */
const sequelize = require('./utils/database');

/* Sequelize Model Imports */
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

/* Setting up global configuration values ... */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* Resgistering a (req) body parser ... */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/* Mock user authentication */
app.use((req, res, next) => {
    User.findByPk(1).then(user => {
        req.user = user;
        next();
    }).catch((error) => {
        console.log('Error in user authentication: ', error);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/* Establish relations/associations between models */
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// sequelize.sync({ force: true }).then((result) => {
sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then(user => {
      if(!user) {
        return User.create({ name: 'Arka Sain', email: 'arka.sain@aol.com' });
      }
      return Promise.resolve(user);
  })
  .then(user => {
      console.log('User: ', user);
      app.listen(3210);
  })
  .catch((error) => {
    console.log('Error while syncing JS Definitions to DB: ', error);
  });
