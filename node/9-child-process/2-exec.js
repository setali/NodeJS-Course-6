const { exec } = require("child_process");

exec("ls -l | grep .js", (error, stdout) => {
  if (error) {
    console.error(error);
  } else {
    console.log(stdout);
  }
});
