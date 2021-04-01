import { Server } from "node:http";

const serverRoutes = require("./serverRoutes");
const http = require("http");

const PORT = 3000;

const server: Server = http.createServer(serverRoutes.reqHandler);
server.listen(PORT);
console.log(`Server running on PORT ${PORT}`);