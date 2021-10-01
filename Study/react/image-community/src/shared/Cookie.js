//1일은 1000밀리초 `*` 60초 `*` 60분 `*` 24시간
export const getCookie = (name) => {
  console.log("name = ", name);
  let value = "; " + document.cookie;
  // 이름에 맞는거를 찾고 for문을 돌리기 싫어서 ;에 이름을 추가해줌
  // ; user_id= 이렇게 문자열을 자름, aa=xx, user_id=aaa; 첫번째 aa=xx는 자르고 바로 두번째꺼로 찾을 수 있따.
  let parts = value.split(`; ${name}=`);

  // 내가 찾는 정보가 쿠키에 없을 수 있어서 있을 경우만 찾아라.
  if (parts.length === 2) {
    // 두번째 정보만 필요하기 때문에, 앞에꺼는 버려야한다.
    return parts.pop().split(";").shift(); // parts의 원본 배열에서 맨 뒤에 정보가 사라지고 반환된다.
    // pop() 는 맨 마지막을 잘라내기 해서 주고, shift는 앞에 있는것을 잘라내서 준다.
  }
};

// 쿠키 생성
export const setCookie = (id, pw, exp = 5) => {
  let date = new Date();
  // 만료일 날짜만듬. (3일뒤)
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  document.cookie = `${id}=${pw};expires=${date.toUTCString()};path=/`;
};

export const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();
  document.cookie = name + `=; expires=${date}`;
};
