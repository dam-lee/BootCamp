import React from "react";
import { useParams } from "react-router-dom";
const Cat = (props) => {
  const cat_name = useParams();
  console.log("cat_name  ? ", cat_name);
  console.log("props == ", props);
  return (
    <>
      <h1>여기는 고양이 페이지입니다.</h1>
    </>
  );
};

export default Cat;
