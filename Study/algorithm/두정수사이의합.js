function solution(a, b) {
  let answer = 0;
  const num = [a, b].sort((a, b) => a - b);
  const maxNum = num[num.length - 1];
  for (let i = num[0]; i <= maxNum; i++) {
    answer += i;
  }
  return answer;
}
