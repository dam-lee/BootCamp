const fs = require("fs");
const inputData = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split(" ")
  .map((val) => +val);
const [A, B, C] = inputData;

console.log((A + B) % C);
console.log(((A % C) + (B % C)) % C);
console.log((A * B) % C);
console.log(((A % C) * (B % C)) % C);
