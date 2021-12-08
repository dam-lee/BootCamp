function solution(n) {
  var answer = 0;
  const str = String(n);
  for (let i = 0; i < str.length; i++) {
    answer += +str[i];
  }
  return answer;
}
