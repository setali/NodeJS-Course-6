const buf = Buffer.from("AliMousavi");

console.log(buf);
console.log(buf.length);

console.log(buf.slice(0, 3).toString());
console.log(buf.subarray(0, 3).toString());


buf[0] = 69

console.log(buf)
console.log(buf.toString())
