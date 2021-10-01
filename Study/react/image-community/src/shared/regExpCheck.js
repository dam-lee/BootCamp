export const regCheck = (value) => {
  console.log("value == ", value);
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!regExp.test(value)) {
    alert("이메일 형식을 다시 입력해주세요");
    return;
  }
  return value;
};
