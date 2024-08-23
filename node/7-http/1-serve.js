const http = require("http");
const { convert } = require("../5-buffer/5-convert");

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  //   console.log(req.method);
  //   console.log(req.httpVersion);
  //   console.log(req.headers);

  //   res.setHeader("Content-Type", "text/plain");
  //   res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Type", "application/json");

  const result = convert("Ali Mousavi", "utf8", "base64");

  const buf = Buffer.from("AliMousavi");

  res.statusCode = 200;
  res.write(JSON.stringify({ name: "Ali" }));
  res.end();

  return;
  console.log("This code works! you should use return");
  //   return;
  //   res.write("<h1>");
  //   res.write(result, "base64");
  //   res.write(buf);
  //   res.write("</h1>");

  //   res.end();
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
