const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split(" ");
const a = +input[0];
const b = +input[1];
const v = +input[2];

console.log(Math.ceil((v - b) / (a - b)));

// let day = 1;
// let m = 0;
// if (m <= v) {
//   m = a - b;
//   day++;
// }
