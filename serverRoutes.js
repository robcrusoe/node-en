"use strict";
exports.__esModule = true;
var serverRequestHandler = function (req, res) {
    var url = req.url, method = req.method;
    console.log("url: ", url);
    console.log("method: ", method);
    if (url === "/" && method === "GET") {
        res.statusCode = 200;
        res.write("\n            <html>\n                <head>\n                    <title>Server Play!</title>\n                    <link rel=\"icon\" href=\"data:;base64,iVBORw0KGgo=\">\n                </head>\n\n                <body>\n                    <h1>Hello from our NodeJS Server!</h1>\n                    <form action=\"/create-user\" method=\"POST\">\n                        <input type=\"text\" placeholder=\"Enter User Name here ...\" name=\"userName\" />\n                        <button type=\"submit\">Create User</button>\n                    </form>\n                </body>\n            </html>\n            ");
        return res.end();
    }
    if (url === "/users" && method === "GET") {
        res.statusCode = 200;
        res.write("\n              <html>\n                  <head>\n                      <title>Registered Users</title>\n                      <link rel=\"icon\" href=\"data:;base64,iVBORw0KGgo=\">\n                  </head>\n  \n                  <body>\n                      <h1>Our list of registered users: </h1>\n                      <ul>\n                        <li>Art Blank</li>\n                        <li>Rebecca Thompson</li>\n                        <li>Tanya Rovers</li>\n                        <li>Michael Guild</li>\n                        <li>Jeremy Lambert</li>\n                      </ul>\n                  </body>\n              </html>\n              ");
        return res.end();
    }
    if (url === "/create-user" && method === "POST") {
        var messageBody_1 = [];
        req.on("data", function (chunk) {
            messageBody_1.push(chunk);
        });
        return req.on("end", function () {
            var parsedBody = Buffer.concat(messageBody_1).toString();
            console.log("parsedBody: ", parsedBody);
            var userName = parsedBody.split("=")[1];
            console.log("userName: ", userName);
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        });
    }
};
module.exports = {
    reqHandler: serverRequestHandler
};
