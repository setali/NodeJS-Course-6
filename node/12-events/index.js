const myEvent = require("./my-event");
require("./event-handler");

setTimeout(() => {
  myEvent.emit("HELLO", "ali", "mousavi");
}, 2000);

setTimeout(() => {
  myEvent.emit("mul", 5, 6);
}, 3000);
