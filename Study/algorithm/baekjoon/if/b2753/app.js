const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
solution(+input[0]);
function solution(num) {
  // 윤년 찾기
  // 4의 배수 찾기, 100의 배수가 아닌것 찾기
  // 또는 400의 배수가 아닌것 찾기
  if ((num % 4 === 0 && num % 100 !== 0) || num % 400 === 0) {
    console.log(1);
  } else {
    console.log(0);
  }
}
