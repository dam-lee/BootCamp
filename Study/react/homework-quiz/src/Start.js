import React from "react";
import styled from "styled-components";
const Start = ({ name }) => {
  return (
    <Container>
      <Wrap>
        <Title>
          나는 <Name>{name}</Name>에 대해서 <br />
          얼마나 알고 있을까?
        </Title>
        <Input type="text" placeholder="내 이름" />
        <StartButton>시작하기</StartButton>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  -webkit-align-items: center;
  align-items: center;
`;
const Wrap = styled.div`
  width: 350px;
  margin: auto;
  text-align: center;
`;
const Title = styled.h1`
  color: #343a40;
  line-height: 1.7;
`;
const Name = styled.span`
  padding: 6px 14px;
  border-radius: 30px;
  background-color: #e5dbff;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 50px;
  padding: 15px 20px;
  border-radius: 25px;
  border: 1px solid #f1f3f5;
  background-color: #f1f3f5;
  &:focus {
    outline: none;
  }
`;
const StartButton = styled.button`
  margin-top: 30px;
  padding: 12px 30px;
  color: #fff;
  border-radius: 25px;
  border: 1px solid #9775fa;
  background-color: #9775fa;
`;
export default Start;
