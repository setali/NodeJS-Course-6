const buf = Buffer.from("AliMousavi");

const buf2 = Buffer.from("Qoli");

buf.set(buf2);

console.log(buf);
console.log(buf.toString());
