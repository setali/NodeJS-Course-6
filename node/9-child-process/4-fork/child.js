const heavyProcess = require("./heavy-process");

console.log("Child:", process.pid, process.ppid);

process.on("message", (data) => {
  console.log("Parent say:", data);
});

// process.send('Alek')

process.send({ value: heavyProcess() });

// setInterval(() => {
//   console.log("Child: ", Date.now());
// }, 1000);
