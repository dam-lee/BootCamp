function solution(x) {
  var answer = true;
  let num = 0;
  let sum = "";
  answer = String(x)
    .split("")
    .map((item) => {
      num += parseInt(item);
      sum += item;
      return sum % num === 0;
    });
  return answer[answer.length - 1];
}
