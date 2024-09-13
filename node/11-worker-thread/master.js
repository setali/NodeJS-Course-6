const { Worker } = require("worker_threads");
const path = require("path");

const workerPath = path.resolve(__dirname, "worker.js");

function makeWorker(a, b) {
  const worker = new Worker(workerPath, {
    workerData: { a, b },
  });

  worker.on("message", (data) => {
    if (data === "terminate") {
      worker.terminate();
    }
    console.log(data);
  });

  worker.on("error", console.log);

  worker.on("exit", (code) => console.log("Exit Code:", code));
}

console.log("Main:", process.pid);

// makeWorker(999999999n, 9999999n);
// makeWorker(999999999n, 999999n);
// makeWorker(99999999n, 9999999n);
makeWorker(9999999n, 9999999n);
makeWorker(9999999n, 9999999n);
makeWorker(9999999n, 9999999n);
makeWorker(9999999n, 9999999n);
makeWorker(9999999n, 9999999n);
makeWorker(9999999n, 9999999n);
makeWorker(9999999n, 9999999n);
makeWorker(9999999n, 9999999n);
makeWorker(9999999n, 9999999n);

setInterval(() => {
  console.log(Date.now());
}, 1000);
