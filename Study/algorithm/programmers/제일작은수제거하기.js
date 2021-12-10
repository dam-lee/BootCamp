function solution(arr) {
  var answer = [];
  if (arr.length === 0 || arr[0] === 10) {
    return (answer = [-1]);
  } else {
    const array = Math.min(...arr);
    const index = arr.indexOf(array);
    answer = arr.filter((_item, idx) => idx !== index);
    return answer;
  }
}
