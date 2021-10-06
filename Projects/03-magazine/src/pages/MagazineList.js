import React from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";
import Magazine from "../components/Magazine";
import { Grid } from "../elements";
import { FaPlus } from "react-icons/fa";
const MagazineList = (props) => {
  const history = useHistory();
  const data = [
    {
      date: "2021-10-06",
      title: "제목 1",
      text: "안녕하세요 오늘은 수요일입니다. 과제는 금요일 저녁까지 제출해야해요. 너무 힘듭니다. 하하하핫",
      user_name: "이미다",
      like: 10,
      src: "https://cdn.dailyimpact.co.kr/news/photo/201901/50650_10024_2221.jpg",
    },
    {
      date: "2021-10-07",
      title: "아이유 사진",
      text: "안녕하세요 오늘은 수요일입니다. 과제는 금요일 저녁까지 제출해야해요. 너무 힘듭니다. 하하하핫 안녕하세요 오늘은 수요일입니다. 과제는 금요일 저녁까지 제출해야해요. 너무 힘듭니다. 하하하핫",
      user_name: "이루이",
      like: 8,
      src: "http://img.khan.co.kr/news/2020/10/16/2020101601001687000138341.jpg",
    },
    {
      date: "2021-10-08",
      title: "아이유",
      text: "안녕하세요 오늘은 수요일입니다. 과제는 금요일 저녁까지 제출해야해요. 너무 힘듭니다. 하하하핫",
      user_name: "아이유",
      like: 7,
      src: "https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg",
    },
  ];
  return (
    <div style={{ position: "relative" }}>
      <Grid padding="15px 20px 25px">
        {data.map((item, index) => {
          return <Magazine key={index} {...item} />;
        })}
        <CreateButtonWrap onClick={() => history.push(`/create`)}>
          <FaPlus style={{ fontSize: "22px" }} />
        </CreateButtonWrap>
      </Grid>
    </div>
  );
};
const boxFade = keyframes`
  0% {
    background-color: #000;
  }
  100% {
    background-color: #e03131;
  }
`;
const CreateButtonWrap = styled.button`
  position: fixed;
  right: 33vw;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #fff;
  border: none;
  background-color: #000;
  cursor: pointer;
  &:hover {
    animation-duration: 0.5s;
    animation-name: ${boxFade};
    // 마지막 상태를 유지
    animation-fill-mode: forwards;
  }
`;
export default MagazineList;
