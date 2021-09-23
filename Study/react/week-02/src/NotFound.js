import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  return (
    <>
      <h1>주소가 올바르지 않습니다. 다시 확인해주세요!</h1>
      <button onClick={() => history.goBack()}>뒤로가기</button>
    </>
  );
};

export default NotFound;
