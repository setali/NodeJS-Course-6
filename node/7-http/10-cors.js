const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    return res.end(fs.readFileSync(path.resolve(__dirname, "fetch.html")));
  }

  if (req.url === "/api") {
    console.log("salam");
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    return res.end(JSON.stringify({ name: "Ali" }));
  }
});

server.listen(3000, () => console.log("Running oun port 3000"));
