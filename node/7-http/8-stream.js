const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const filePath = path.resolve(__dirname, "music.mp3");

  const stream = fs.createReadStream(filePath, { highWaterMark: 1024 });

  stream.pipe(res);
//   stream.pipe(process.stdout)

  setTimeout(() => {
    stream.pause();
  }, 100);

  setTimeout(() => {
    stream.resume();
  }, 30000);
});

server.listen(3000, () => {
  console.clear();
  console.log("Server is running on port 3000");
});
