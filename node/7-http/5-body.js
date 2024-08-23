const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("qs");

const server = http.createServer((req, res) => {
  if (req.url === "/login" && req.method === "GET") {
    return res.end(fs.readFileSync(path.resolve(__dirname, "login.html")));
  }

  if (req.url === "/login" && req.method === "POST") {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      const buffer = Buffer.concat(chunks);
      const str = buffer.toString();
      const result = qs.parse(str);

      res.end(JSON.stringify(result));
    });

    return;
  }

  if (req.url === "/favicon.ico") {
    return res.end(fs.readFileSync(path.resolve(__dirname, "favicon.ico")));
  }

  res.statusCode = 404;
  res.end("Not found");
});

server.listen(3000, () => "Server is running on port 3000");
