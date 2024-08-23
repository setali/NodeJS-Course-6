const buf = Buffer.from("Ali");

console.log(buf);
console.log(Array.isArray(buf)); // false

for (const b of buf) {
  console.log(b);
}

buf.forEach((b) => console.log(b));
