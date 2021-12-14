function solution(numbers) {
  const numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let num = 0;
  numArray.map((item) => {
    if (!numbers.includes(item)) {
      return (num += item);
    }
  });
  return num;
}
