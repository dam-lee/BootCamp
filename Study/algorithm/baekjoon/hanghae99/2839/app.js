const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString();
let n = +input;
let num = 0;

while (true) {
  if (n % 5 === 0) {
    // num = n / 5;
    console.log(n / 5 + num);
    break;
  }
  if (n < 0) {
    console.log(-1);
    break;
  }
  num++;
  n = n - 3;
}
