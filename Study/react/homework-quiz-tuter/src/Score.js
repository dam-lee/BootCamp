import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Score = (props) => {
  const history = useHistory();
  const quiz_list = useSelector((state) => state.quiz.quiz_list);
  const quiz_name = useSelector((state) => state.quiz.quiz_name);
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list);
  const _score =
    (100 / quiz_list.length) * // 맞춘거를 계산
    quiz_list.filter((item, index) => {
      return item.answer === user_answer_list[index];
    }).length; // 맞춘 갯수
  const score = Math.round(_score);
  // 컬러셋 참고: https://www.shutterstock.com/ko/blog/pastel-color-palettes-rococo-trend/
  return (
    <ScoreContainer>
      <Text>
        <span>{quiz_name}</span>
        퀴즈에 <br />
        대한 내 점수는?
      </Text>
      <MyScore>
        <span>{score}</span>점<p>{props.scoreMsg}</p>
      </MyScore>
      <Button onClick={() => history.push("/message")} outlined>
        {quiz_name}에게 한 마디
      </Button>
      {/* <Button>다시 하기</Button> */}
      <Button>랭킹보기</Button>
    </ScoreContainer>
  );
};

const ScoreContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  font-size: 1.5em;
  margin: 0px;
  line-height: 1.4;
  & span {
    background-color: #fef5d4;
    padding: 5px 10px;
    border-radius: 30px;
  }
`;

const MyScore = styled.div`
  & span {
    border-radius: 30px;
    padding: 5px 10px;
    background-color: #fef5d4;
  }
  font-weight: 600;
  font-size: 2em;
  margin: 24px;

  & > p {
    margin: 24px 0px;
    font-size: 16px;
    font-weight: 400;
  }
`;
const Button = styled.button`
  padding: 8px 24px;
  background-color: ${(props) => (props.outlined ? "#ffffff" : "#dadafc")};
  border-radius: 30px;
  margin: 8px;
  border: 1px solid #dadafc;
  width: 80vw;
`;

export default Score;
