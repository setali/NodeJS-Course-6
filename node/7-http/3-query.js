const http = require("http");
const fs = require("fs");
const path = require("path");
const URL = require("url");

function initApp(req, res) {
  const { pathname, query } = URL.parse(req.url);
  req.pathname = pathname;
  req.query = query
    ? Object.fromEntries(query.split("&").map((el) => el.split("=")))
    : {};

  res.json = (data) => res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  initApp(req, res);

  const { pathname, query } = req;

  if (pathname === "/") {
    return res.end(fs.readFileSync(path.resolve(__dirname, "form-get.html")));
  }

  if (pathname === "/contact") {
    return res.json(query);
  }

  if (pathname === "/favicon.ico") {
    return res.end(fs.readFileSync(path.resolve(__dirname, "favicon.ico")));
  }

  res.statusCode = 404;
  res.end("Not found");
});

server.listen(3000, () => "Server is running on port 3000");
