import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateQuiz } from "./redux/modules/quiz";

const Quiz = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onTrueClick = () => {
    dispatch(updateQuiz(0));
    history.push("/score");
  };
  const onFalseClick = () => {
    dispatch(updateQuiz(100));
    history.push("/score");
  };
  return (
    <Container>
      <Wrap>
        <Title>Quiz</Title>
        <ImageWrap>
          <Image
            src="https://w.namu.la/s/40de86374ddd74756b31d4694a7434ee9398baa51fa5ae72d28f2eeeafdadf0c475c55c58e29a684920e0d6a42602b339f8aaf6d19764b04405a0f8bee7f598d2922db9475579419aac4635d0a71fdb8a4b2343cb550e6ed93e13c1a05cede75"
            alt="아이유"
          />
        </ImageWrap>
        <Text>아이유의 성별은 남자일까요?</Text>
        <ButtonWrap>
          <Button onClick={onTrueClick}>O</Button>
          <Button onClick={onFalseClick}>X</Button>
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
const ImageWrap = styled.div`
  margin-bottom: 30px;
`;
const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
`;
const Text = styled.p`
  font-weight: 600;
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
export default Quiz;
