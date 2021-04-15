const path = require("path");

const express = require("express");
const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", { docTitle: 'Add Product | Node EN', path: '/admin/add-product', activeAddProduct: true, productCSS: true, formsCSS: true });
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

module.exports = {
  routes: router,
  products: products
};
