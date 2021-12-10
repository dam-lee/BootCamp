function solution(arr, divisor) {
  var answer = [];
  for (let i = 0; i < arr.length; i++) {
    Number.isInteger(arr[i] / divisor) && answer.push(arr[i]);
  }
  const set = new Set(answer);
  const newNum = answer.length > 0 ? [...set].sort((a, b) => a - b) : [-1];
  return newNum;
}
