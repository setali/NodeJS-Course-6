process.title = "Node - Child";

console.log("In Child: ID", process.pid);
console.log("In Child: Parent ID", process.ppid);

setInterval(() => {
  console.log(Date.now());
}, 2000);

// setTimeout(() => {
//   throw new Error("Child Error");
// }, 5000);

setTimeout(() => {
  process.exit();
}, 8000);
