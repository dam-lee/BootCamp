// 1차시도
// 숫자인지 아닌지 여부는 isNaN 함수로 확인할 수 있으니까 당연히 1차 시도를 이렇게함.
// 하지만 테스트 케이스에서 자꾸 실패뜸.
// 안되는 이유 지수형식("1e22") 및 16진법
function solution(s) {
  var answer = true;
  if (s.length === 4 || s.lenght === 6) {
    return (answer = !isNaN(s));
  }
}
//
function solution(s) {
  return (s.length === 4 || s.length === 6) && s == parseInt(s);
}
