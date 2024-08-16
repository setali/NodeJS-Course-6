// const buf = Buffer.alloc(10, "abcdef");

// console.log(buf);
// console.log(typeof buf);

// console.log(buf[0]);
// console.log(buf[1]);

// console.log(Array.isArray(buf));

// console.log(buf.toString());
// console.log(buf.toString("base64"));

// const buf = Buffer.alloc(4, "? @$");
// console.log(buf);

// // 01100001  01101100  01101001
// // 011000010110110001101001
// // 011000 010110 110001 101001
// // YWxp

// console.log(buf.toString("base64"));

// const buf = Buffer.allocUnsafe(10);

// console.log(buf);
// console.log(buf.toString());

// const buf = Buffer.from("Ali Mousavi");

// console.log(buf);
// console.log(buf.length);

// const buf1 = Buffer.from(buf);

// console.log(buf1);
// console.log(buf1 === buf);

// const buf = Buffer.from([97, 98, 99]);

// console.log(buf.toString());

const buf = Buffer.from("علی موسوی");

console.log(buf);
console.log(buf.length);
console.log(buf.toString());
