const { parentPort, workerData } = require("worker_threads");

// Same as main
console.log(process.pid);

// parentPort.on("message", console.log);

// parentPort.postMessage("Aleyk");

// parentPort.postMessage("terminate");

const result = (workerData.a ** workerData.b).toString().length;

parentPort.postMessage(result);
