const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

console.log("input ? ", input);
// solution(+input[0]);

const testCaseArray = [];
for (let i = 1; i <= +input[0]; ++i) {
  const tempValue = input[i].split(" ").map((item) => +item);
  testCaseArray.push(input[i].split(" ").map((item) => +item));
}
console.log("testCaseArray ??? ", testCaseArray);
// solution(testCaseArray);
// function solution(testcaseArray) {}
