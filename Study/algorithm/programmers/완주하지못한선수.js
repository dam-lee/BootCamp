function solution(participant, completion) {
  participant.sort();
  completion.sort();
  const array = participant.filter((item, idx) => {
    return item !== completion[idx];
  });
  return array[0];
}
