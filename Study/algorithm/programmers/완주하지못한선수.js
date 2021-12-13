function solution(participant, completion) {
  participant.sort();
  completion.sort();
  const array = participant.filter((item, idx) => {
    return item !== completion[idx];
  });
  return array[0];
}

// array.find 함수 써서 다시 풀어봄
function solution(participant, completion) {
  participant.sort();
  completion.sort();
  const array = participant.find((item, index) => {
    return item !== completion[index];
  });
  return array;
}

// find()
// 만약 어느 요소를 찾았다면 find 메서드는 해당 요소의 값을 즉시 반환하고, 그렇지 않았다면 undefined를 반환 (주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환)
// callback은 다음의 세가지 인자를 가지고 호출됨: 요소의 값, 요소의 인덱스, 순회의 대상이 되는 배열.
