const { spawn } = require("child_process");
const path = require("path");

process.title = "Node - Parent";

console.log("In Parent: ID", process.pid);

const controller = new AbortController();

const child = spawn("node", [path.resolve(__dirname, "child.js")], {
  signal: controller.signal,
});

console.log("In Parent: Child ID", child.pid);

child.stdout.on("data", (data) => {
  console.log("stdout", data.toString());
});

child.stderr.on("data", (data) => console.log(data.toString()));

child.on("close", (code) => {
  console.log("child process exited with code:", code);
});

setTimeout(() => {
  // controller.abort();
  // child.kill();
}, 6000);

setTimeout(() => {
  console.log("Parent timeout");
}, 20000);
