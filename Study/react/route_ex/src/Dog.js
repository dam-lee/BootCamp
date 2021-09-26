import React from "react";
import { useHistory } from "react-router";

const Dog = (props) => {
  console.log("dog props = ", props);
  const history = useHistory();
  return (
    <>
      <h1 onClick={() => history.push("/")}>여기는 강아지 페이지입니다.</h1>
    </>
  );
};

export default Dog;
