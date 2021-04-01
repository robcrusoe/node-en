"use strict";
exports.__esModule = true;
var routes = require("./routes");
var http = require("http");
var server = http.createServer(routes);
server.listen(3000);
