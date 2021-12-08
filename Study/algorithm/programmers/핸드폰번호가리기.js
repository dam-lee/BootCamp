function solution(phone_number) {
  var answer = "";
  const substr = phone_number.substring(0, phone_number.length - 4);
  for (let i = 0; i < phone_number.length; i++) {
    if (phone_number[i] === substr[i]) {
      answer += "*";
    } else {
      answer += phone_number[i];
    }
  }
  return answer;
}

// 다른사람 풀이
// 1. 정규식
function hide_numbers(s) {
  return s.replace(/\d(?=\d{4})/g, "*");
}
// 2. repeat / slice
function hide_numbers(s) {
  var result = "*".repeat(s.length - 4) + s.slice(-4);
  //함수를 완성해주세요

  return result;
}

// 새로알게된 repeat
// repeat() 메서드는 문자열을 주어진 횟수만큼 반복해 붙인 새로운 문자열을 반환
