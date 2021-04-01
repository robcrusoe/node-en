"use strict";
exports.__esModule = true;
var http = require('http');
var server = http.createServer(function (req, res) {
    // console.log('req: ', req);
    // process.exit();
    // console.log('req.headers: ', req.headers);
    // console.log('req.url: ', req.url);
    // console.log('req.method: ', req.method);
    res.setHeader('Content-Type', 'text/html');
    res.write("\n        <html>\n            <head>\n                <title>NodeJS | En</title>\n            </head>\n\n            <body>\n                <h1>Hello from NodeJS Server!</h1>\n            </body>\n        </html>\n        ");
    res.end();
});
server.listen(3000);
