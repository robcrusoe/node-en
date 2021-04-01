import { IncomingMessage, Server, ServerResponse } from "node:http";

const fs = require("fs");

const requestHandler = (req: IncomingMessage, res: ServerResponse): any => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(
      `
                <html>
                    <head>
                        <title>NodeJS | En</title>
                    </head>
        
                    <body>
                        <form action="/message" method="POST">
                          <input type="text" placeholder="Enter Message" name="entered_message" />
                          <button type="submit">Send Message</button>
                        </form>
                    </body>
                </html>
                `
    );
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const requestBody = [];
    req.on("data", (chunk) => {
      console.log("chunk: ", chunk);
      requestBody.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(requestBody).toString();
      console.log("parsedBody: ", parsedBody);

      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
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
};

module.exports = requestHandler;