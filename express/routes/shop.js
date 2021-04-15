const path = require("path");

const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log('adminData.products [shop.js]: ', adminData.products);
  const products = [...adminData.products];
  
  /* The following uses the default templating engine to return the correct template ... */
  res.render('./shop', { prods: products, docTitle: 'Shop | Node EN', path: '/', hasProducts: products.length > 0 });
});

module.exports = router;
