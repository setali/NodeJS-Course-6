const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    return res.end("Home Page");
  }

  if (req.url === "/about") {
    return res.end(fs.readFileSync(path.resolve(__dirname, "about.html")));
  }

  if (req.url === "/favicon.ico") {
    return res.end(fs.readFileSync(path.resolve(__dirname, "favicon.ico")));
  }

  res.statusCode = 404;
  res.end("Not found");
});

server.listen(3000, () => console.log("Port: 3000"));
