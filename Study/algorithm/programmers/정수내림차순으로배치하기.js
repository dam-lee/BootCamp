function solution(n) {
  var answer = 0;
  var array = String(n).split("");
  array = array.sort((a, b) => b - a);
  answer = array.join("");
  return parseInt(answer);
}
