import React from "react";
import styled, { keyframes } from "styled-components";
import cat from "./image/cat01.jpg";
const Spinner = () => {
  return (
    <Wrap>
      <Image src={cat} />
      <Text>점수 계산 중입니다!</Text>
    </Wrap>
  );
};
const animation = keyframes`
0%{
  transform: rotate(0deg);
}
100%{
  transform: rotate(360deg);
}
`;
const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  animation: ${animation} 4s infinite linear alternate;
`;
const Text = styled.h3`
  color: orange;
`;
export default Spinner;
