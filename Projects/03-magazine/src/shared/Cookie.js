const getCookie = (name) => {
  let value = `; ${document.cookie}`;
  // ; 으로만 split 하면, for문을 돌려야 해서 이름을 붙여야한다
  // (`; ${name}=` => user_id ***
  let parts = value.split(`; ${name}=`);

  // 내가 찾는 쿠키가 없을 수 있기 때문에 조건문 처리
  if (parts.length === 2) {
    // 2면, 내가 찾는 쿠키가 있다.
    // 배열의 첫번째 항목은 필요없고 2번째만 필요하기 때문에
    // split로 ; 한번 더 자르고 그다음 pop()으로 배열의 맨 마지막것들은 다 사라지고, 첫번째꺼만 반환된다.
    // shift()는 앞에 것들을 모두 잘라내고 나머지 뒤에것들을 반환한다.
    return parts.pop().split(";").shift();
  }
};

// 이름과 어떤 값이 들어갈지 value 와 만료일인 exp를 가져와야 한다.
// exp = 5는, exp가 없어도 기본값으로 5로 설정할 수 있다.
const setCookie = (name, value, exp = 5) => {
  // 만료일 만들기
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString}`;
};

const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();
  document.cookie = `${name}=; expires=${date}`;
};

export { getCookie, setCookie, deleteCookie };
