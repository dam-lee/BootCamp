function solution(s) {
  var answer = "";
  const num = Math.ceil(s.length / 2);
  if (s.length % 2 === 0) {
    answer = `${s[num - 1]}${s[num]}`;
  } else {
    answer = s[num - 1];
  }
  return answer;
}

// 다른 사람 풀이
function solution(s) {
  return s.substr(Math.ceil(s.length / 2) - 1, s.length % 2 === 0 ? 2 : 1);
}
function solution(s) {
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[mid] : s[mid - 1] + s[mid];
}
