const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split("\n");
input = input[0];
input = input.split(" ").map((item) => +item);
solution(input[0], input[1]);
function solution(H, M) {
  M -= 45; // 분에 45분을 뺀다.
  if (M < 0) {
    // 뺀값이 0보다 작을때
    M += 60; // 시에서 1시간(60분)을 빼서 더한다.
    H -= 1; // 시에서는 1시간을 빼준다.
  }
  if (H < 0) {
    // 만약 시가 0보다 작을때
    H = 23; // 그때는 23시
  }
  console.log(H, M);
}
