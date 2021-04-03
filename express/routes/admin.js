const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.status(200).send(
    `
          <html>
              <head>
                  <title>Add Product</title>
              </head>
  
              <body>
                  <form action="/admin/add-product" method="POST">
                      <input type="text" name="title" placeholder="Enter product ..." />
                      <button type="submit">Add Product</button>
                  </form>
              </body>
          </html>
          `
  );
});

router.post("/add-product", (req, res, next) => {
  console.log("req.body: ", req.body);
  res.redirect("/");
});

module.exports = router;
