const { Transform } = require("stream");

const transformStream = new Transform();

transformStream._transform = (chunk, encoding) => {
  const result = chunk.toString().toUpperCase();
  transformStream.push(result);
};

process.stdin.pipe(transformStream).pipe(process.stdout);
