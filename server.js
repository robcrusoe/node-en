"use strict";
exports.__esModule = true;
var serverRoutes = require("./serverRoutes");
var http = require("http");
var PORT = 3000;
var server = http.createServer(serverRoutes.reqHandler);
server.listen(PORT);
console.log("Server running on PORT " + PORT);
