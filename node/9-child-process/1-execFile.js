const { execFile } = require("child_process");

execFile("ls", ["-a"], (error, stdout, stderr) => {
// execFile("node", ["-v"], (error, stdout, stderr) => {
  if (error) {
    console.error(error);
  } else {
    console.log(stdout);
  }
});
