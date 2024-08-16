const os = require("os");

console.log(os.cpus().length);
console.log(os.cpus());

console.log(process.uptime());

// UV_THREADPOOL_SIZE = 10

setTimeout(() => {
  console.log("Salam");
}, 100000);

console.log(process.pid);
console.log(process.ppid);
console.log(process.cwd());

console.log(process.env.USER);

setTimeout(() => {
  //   process.exit();
  //   process.kill(process.pid);
}, 1000);

// setTimeout(() => {
//   console.log(process.uptime());
// }, 1000);

console.log(process.cpuUsage());
// console.log(process.resourceUsage());
console.log(process.memoryUsage());

process.title = "Anisa";

process.on("uncaughtException", (ex) => {
  console.log(ex);
});

setInterval(() => {
  console.log(Date.now());
}, 1000);

throw new Error("salam");
