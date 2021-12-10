function solution(n) {
  let answer = String(n).split("");
  return answer.map((item) => parseInt(item)).reverse();
}
