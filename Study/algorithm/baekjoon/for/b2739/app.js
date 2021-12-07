const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
solution(+input[0]);
function solution(n) {
  const num1 = 3;
  const num2 = 5000;
  console.log(num1 <= n <= num2);
}
