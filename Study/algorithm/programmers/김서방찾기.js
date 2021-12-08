function solution(seoul) {
  var answer = "";
  const find = seoul.findIndex((item) => item === "Kim");
  return (answer = `김서방은 ${find}에 있다`);
}
