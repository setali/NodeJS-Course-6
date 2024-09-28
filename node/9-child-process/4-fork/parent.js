const { fork } = require("child_process");

const child1 = fork(`${__dirname}/child.js`);
const child2 = fork(`${__dirname}/child.js`);
const child3 = fork(`${__dirname}/child.js`);
const child4 = fork(`${__dirname}/child.js`);
const child5 = fork(`${__dirname}/child.js`);
const child6 = fork(`${__dirname}/child.js`);


// child.send("salam");
child1.on("message", (data) => console.log("child1", data));
child2.on("message", (data) => console.log("child2", data));
child3.on("message", (data) => console.log("child3", data));
child4.on("message", (data) => console.log("child4", data));
child5.on("message", (data) => console.log("child5", data));
child6.on("message", (data) => console.log("child6", data));

// setTimeout(() => {
//   console.log(heavyProcess());
// }, 0);

console.log("salam");

setInterval(() => {
  console.log(Date.now());
}, 1000);
