console.log("Hi %s, welcome", "Ali");

console.log("Hi %d", 2.13);
console.log("Hi %i", 2.13);

const obj = {
  name: "Ali",
  family: "Mousavi",
  getFullName: function () {
    return this.name + this.family;
  },
};

console.log(obj);
console.log(`${obj}`);
console.log("Hi %o", obj);
console.log("Hi %o", Boolean);
