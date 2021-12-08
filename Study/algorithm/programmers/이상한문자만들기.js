function solution(s) {
  const splitStr = s.split(" ");
  const newArray = [];
  for (let i = 0; i < splitStr.length; i++) {
    const newStr = splitStr[i].split("");
    for (let i = 0; i < newStr.length; i++) {
      if (i % 2 === 0) {
        newArray.push(newStr[i].toUpperCase());
      } else {
        newArray.push(newStr[i].toLowerCase());
      }
    }
    newArray.push(" ");
  }
  newArray.splice(-1, 1);
  return newArray.join("");
}

// 다른 사람 풀이
// 정규표현식
function toWeirdCase(s) {
  return s.toUpperCase().replace(/(\w)(\w)/g, function (a) {
    return a[0].toUpperCase() + a[1].toLowerCase();
  });
}
