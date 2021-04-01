import { IncomingMessage, Server, ServerResponse } from "node:http";

const routes = require("./routes");
const http = require("http");

const server: Server = http.createServer(routes);
server.listen(3000);
