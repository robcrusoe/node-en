const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send("<h1>Welcome!</h1>");
});

module.exports = router;
