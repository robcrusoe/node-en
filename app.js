"use strict";
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
var server = http.createServer(function (req, res) {
    // console.log('req: ', req);
    // process.exit();
    // console.log('req.headers: ', req.headers);
    // console.log('req.url: ', req.url);
    // console.log('req.method: ', req.method);
    var url = req.url;
    var method = req.method;
    if (url === "/") {
        res.write("\n              <html>\n                  <head>\n                      <title>NodeJS | En</title>\n                  </head>\n      \n                  <body>\n                      <form action=\"/message\" method=\"POST\">\n                        <input type=\"text\" placeholder=\"Enter Message\" name=\"entered_message\" />\n                        <button type=\"submit\">Send Message</button>\n                      </form>\n                  </body>\n              </html>\n              ");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        var requestBody_1 = [];
        req.on("data", function (chunk) {
            console.log("chunk: ", chunk);
            requestBody_1.push(chunk);
        });
        return req.on("end", function () {
            var parsedBody = Buffer.concat(requestBody_1).toString();
            console.log("parsedBody: ", parsedBody);
            var message = parsedBody.split("=")[1];
            fs.writeFileSync("message.txt", message);
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        });
    }
    res.setHeader("Content-Type", "text/html");
    res.write("\n          <html>\n              <head>\n                  <title>NodeJS | En</title>\n              </head>\n  \n              <body>\n                  <h1>Hello from NodeJS Server!</h1>\n              </body>\n          </html>\n          ");
    res.end();
});
server.listen(3000);
