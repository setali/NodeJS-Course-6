const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const entries =
      req.headers.cookie?.split(";").map((el) => el.trim().split("=")) || [];

    const cookies = Object.fromEntries(entries);
    console.log(cookies);

    let counter = +cookies.counter || 0;

    res.setHeader("Set-Cookie", `counter=${++counter}; Max-Age=3000; httpOnly; Secure; SameSite=None; path=/blog;`);
  }

  // SameSite => None | Lax | Strict

  res.end("salam");
});

server.listen(3000, () => console.log("running"));
