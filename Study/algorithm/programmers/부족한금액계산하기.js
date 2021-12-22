// 놀이기구 부족한 금액 계산하기
function solution(price, money, count) {
  let total = 0;
  // 놀이기구 탄 수만큼 금액 계산
  for (let i = 1; i <= count; i++) {
    total += i * price;
  }
  // 놀이기구 총 이용한 금액이 가진돈보다 클 때 값 반환. 돈이 부족하지 않으면 0
  return (total = total < money ? 0 : total - money);
}
