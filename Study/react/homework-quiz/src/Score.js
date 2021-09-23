import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Score = () => {
  const quiz = useSelector((state) => state.quiz);
  const history = useHistory();
  const userName = quiz.user_name;
  const userScore = quiz.quiz_score;

  const onQuiz = () => {
    history.goBack();
  };
  const onHome = () => {
    history.push("/");
  };
  return (
    <Container>
      <Wrap>
        <Title>
          <Name>아이유</Name>퀴즈에 대한
          <br />
          {userName}님의 점수는 <br />
          {userScore}점!
        </Title>
        <p>
          {userScore === 100 ? "우와 축하드려요!" : "문제를 다시 풀어보세요!"}
        </p>
        <ButtonWrap>
          <Button onClick={onQuiz}>문제 다시 풀기</Button>
          <Button onClick={onHome}>홈 화면으로 이동!</Button>
        </ButtonWrap>
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
  width: 60vh;
  min-height: 70vh;
  padding: 30px;
  margin: auto;
  text-align: center;
  border-radius: 8px;
  background-color: #f1f3f5;
`;
const Title = styled.h1`
  margin: 0 0 10px;
  color: #343a40;
  line-height: 1.7;
`;
const Name = styled.span`
  padding: 6px 14px;
  border-radius: 30px;
  color: #fff;
  background-color: #495057;
`;

const ButtonWrap = styled.div`
  margin-top: 30px;
`;
const Button = styled.button`
  padding: 15px 25px;
  border: 1px solid #fff;
  background-color: #fff;
  &:last-child {
    margin-left: 20px;
  }
`;

export default Score;
