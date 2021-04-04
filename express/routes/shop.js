const path = require("path");

const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log('adminData.products [shop.js]: ', adminData.products);
  res.status(200).sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

module.exports = router;
