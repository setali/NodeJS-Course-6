const myEvent = require("./my-event");

myEvent.on("HELLO", (name, family) => {
  console.log(name, family);
});

myEvent.on("mul", (a, b) => {
  console.log(a * b);
});
