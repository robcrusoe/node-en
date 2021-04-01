import { IncomingMessage, ServerResponse } from "node:http";

const serverRequestHandler = (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;
  console.log("url: ", url);
  console.log("method: ", method);

  if (url === "/" && method === "GET") {
    res.statusCode = 200;
    res.write(
      `
            <html>
                <head>
                    <title>Server Play!</title>
                    <link rel="icon" href="data:;base64,iVBORw0KGgo=">
                </head>

                <body>
                    <h1>Hello from our NodeJS Server!</h1>
                    <form action="/create-user" method="POST">
                        <input type="text" placeholder="Enter User Name here ..." name="userName" />
                        <button type="submit">Create User</button>
                    </form>
                </body>
            </html>
            `
    );
    return res.end();
  }

  if (url === "/users" && method === "GET") {
    res.statusCode = 200;
    res.write(
      `
              <html>
                  <head>
                      <title>Registered Users</title>
                      <link rel="icon" href="data:;base64,iVBORw0KGgo=">
                  </head>
  
                  <body>
                      <h1>Our list of registered users: </h1>
                      <ul>
                        <li>Art Blank</li>
                        <li>Rebecca Thompson</li>
                        <li>Tanya Rovers</li>
                        <li>Michael Guild</li>
                        <li>Jeremy Lambert</li>
                      </ul>
                  </body>
              </html>
              `
    );
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const messageBody: any[] = [];

    req.on("data", (chunk) => {
      messageBody.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody: string = Buffer.concat(messageBody).toString();
      console.log("parsedBody: ", parsedBody);

      const userName: string = parsedBody.split("=")[1];
      console.log("userName: ", userName);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
};

module.exports = {
  reqHandler: serverRequestHandler,
};
