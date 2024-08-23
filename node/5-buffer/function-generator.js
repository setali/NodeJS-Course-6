function* func() {
  yield "Ali";
  yield "Eli";
  yield "Qoli";
}

const it = func();

for (const i of it) {
  console.log(i);
}

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// function func() {
//   return "Ali";
//   console.log("qoli");
// }

// console.log(func());
