const http = require("http");
const cpuCounts = require("os").cpus().length;
const cluster = require("cluster");

if (cluster.isMaster) {
  console.log("Master is running on: ", process.pid, cluster.isMaster);
  for (let i = 0; i < cpuCounts; i++) {
    cluster.fork();
  }
} else {
  http
    .createServer((req, res) => {
      res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
      res.end(process.pid + "");
    })
    .listen(3000);

  console.log(`Worker ${process.pid} started`, cluster.isMaster);
}
