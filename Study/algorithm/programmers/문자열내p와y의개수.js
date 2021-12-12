function solution(s) {
  var answer = true;
  const str = s.toLowerCase().split("");
  let p = 0;
  let y = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "p") {
      p++;
    } else if (str[i] === "y") {
      y++;
    }
  }
  return (answer = p === y ? true : false);
}

// 다른 사람 풀이
function numPY(s) {
  return (
    s.toUpperCase().split("P").length === s.toUpperCase().split("Y").length
  );
}
