import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Progress = (props) => {
  const bucket_list = useSelector((state) => state.bucket.list);
  let count = 0;
  bucket_list.map((item) => {
    return item.done && count++;
  });
  // 완료 퍼센트 구하기
  // (전체 / 완료된것 * 100 )%
  return (
    <>
      <ProgressBox>
        <ProgressLine width={(count / bucket_list.length) * 100 + "%"} />
        <Dot />
      </ProgressBox>
    </>
  );
};

const ProgressBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  border-radius: 30px;
  background-color: #e9ecef;
`;
const ProgressLine = styled.div`
  width: ${(props) => props.width};
  // 몇초동안 어떤거에 효과를 줄것인가 뒤를 생략하면 모든것이다
  transition: 1s;
  height: 20px;
  border-radius: 30px;
  background-color: slateblue;
`;

const Dot = styled.div`
  width: 20px;
  height: 20px;
  margin: 0px 0px 0px -10px;
  background-color: #fff;
  border: 5px solid #5c940d;
  border-radius: 50%;
`;
export default Progress;
