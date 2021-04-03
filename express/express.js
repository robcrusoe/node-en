/* Core Module Imports */
const path = require("path");

/* 3rd Party Imports */
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");

const app = express();

/* Resgistering a (req) body parser ... */
app.use(bodyParser.urlencoded({ extended: false }));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use("/add-product", (req, res, next) => {
  res.status(200).send(
    `
        <html>
            <head>
                <title>Add Product</title>
            </head>

            <body>
                <form action="/product" method="POST">
                    <input type="text" name="title" placeholder="Enter product ..." />
                    <button type="submit">Add Product</button>
                </form>
            </body>
        </html>
        `
  );
});

app.post("/product", (req, res, next) => {
  console.log("req.body: ", req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.status(200).send("<h1>Welcome!</h1>");
});

app.listen(3000);
