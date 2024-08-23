const { Readable, Writable } = require("stream");
const path = require("path");
const fs = require("fs");

const chunks = [];

const writableStream = new Writable({
  write: (chunk, encoding, next) => {
    console.log(chunk.length);
    chunks.push(chunk);
    next();
  },
});

const readableStream = new Readable({
  read: () => {},
});

readableStream.pipe(writableStream);

readableStream.on("close", () => writableStream.end());
writableStream.on("close", () => {
  console.log("Writable stream closed!");
  const buffer = Buffer.concat(chunks);
  const filePath = path.resolve(__dirname, "files", "new-image.jpg");
  fs.writeFileSync(filePath, buffer);
});

const filePath = path.resolve(__dirname, "files", "image.jpg");

const data = fs.readFileSync(filePath);

const CHUNK_SIZE = 2 ** 10; // 1KB

const CHUNK_COUNT = Math.ceil(data.length / CHUNK_SIZE);

for (let i = 0; i < CHUNK_COUNT; i++) {
  const chunk = data.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
  readableStream.push(chunk);
}

readableStream.destroy();
