function solution(s) {
  var answer = [];
  answer = s.split("");
  const str = answer.sort().reverse().join("");
  return str;
}
