import { IncomingMessage, Server, ServerResponse } from "node:http";

const http = require('http');

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    // console.log('req: ', req);
    // process.exit();

    // console.log('req.headers: ', req.headers);
    // console.log('req.url: ', req.url);
    // console.log('req.method: ', req.method);

    res.setHeader('Content-Type', 'text/html');
    res.write(
        `
        <html>
            <head>
                <title>NodeJS | En</title>
            </head>

            <body>
                <h1>Hello from NodeJS Server!</h1>
            </body>
        </html>
        `
    );
    res.end();
});
server.listen(3000);