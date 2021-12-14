function solution(a, b) {
  const week = new Array("SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT");
  // Date 생성자 함수를 생성해서 요일에 해당 하는 숫자를 반환하는 getDay() 를 적용한다.
  // getDay() 메서드는 주어진 날짜의 현지 시간 기준 요일을 반환. 0은 일요일을 나타내며 주어진 년도의 월(a),일(b)를 넣어서 반환하면 요일의 숫자를 반환
  const date = new Date(`2016-${a}-${b}`).getDay();
  // 반환된 요일(date)를 week 배열에 넣어서 값을 찾는다.
  const answer = week[date];
  return answer;
}
