"use strict";
exports.__esModule = true;
var fs = require("fs");
var requestHandler = function (req, res) {
    var url = req.url;
    var method = req.method;
    if (url === "/") {
        res.write("\n                <html>\n                    <head>\n                        <title>NodeJS | En</title>\n                    </head>\n        \n                    <body>\n                        <form action=\"/message\" method=\"POST\">\n                          <input type=\"text\" placeholder=\"Enter Message\" name=\"entered_message\" />\n                          <button type=\"submit\">Send Message</button>\n                        </form>\n                    </body>\n                </html>\n                ");
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
            fs.writeFile("message.txt", message, function (error) {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    }
    res.setHeader("Content-Type", "text/html");
    res.write("\n          <html>\n              <head>\n                  <title>NodeJS | En</title>\n              </head>\n  \n              <body>\n                  <h1>Hello from NodeJS Server!</h1>\n              </body>\n          </html>\n          ");
    res.end();
};
module.exports = {
    handler: requestHandler
};
