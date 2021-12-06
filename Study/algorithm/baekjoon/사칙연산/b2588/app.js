// 문제 곱셈
// 세자리수 * 세자리 수는 다음과 같은 과정을 통하여 이루어진다.
// 1,2위치에 들어갈 세 자리 자연수가 주어질때 3,4,5,6 위치에 들어갈 값을 구하는 프로그램작성

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
input = input.map((item) => +item);
solution(input[0], input[1]);
function solution(A, B) {
  // B를 문자열로 만들어서 index번호를 갖고 올 수 있게 한다음
  // A랑 다시 숫자타입으로 변경해서 곱한다.
  const stringB = String(B);
  console.log(A * +stringB[2]);
  console.log(A * +stringB[1]);
  console.log(A * +stringB[0]);
  console.log(A * B);
}
