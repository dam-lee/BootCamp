import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { createUserName } from "./redux/modules/quiz";
import { useHistory } from "react-router";
const Start = (props) => {
  const history = useHistory();
  const storeData = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const [names, setNames] = React.useState({
    user_name: storeData.user_name,
    quiz_name: storeData.quiz_name,
  });

  const onUserName = (e) => {
    setNames({
      ...names,
      user_name: e.target.value,
      quiz_name: names.quiz_name,
    });
  };

  const onStart = () => {
    dispatch(createUserName(names.user_name));
    history.push("/quiz");
  };

  React.useEffect(() => {}, []);
  return (
    <Container>
      <Wrap>
        <Title>
          나는 <Name>{names.quiz_name}</Name>에 대해서 <br />
          얼마나 알고 있을까?
        </Title>

        <Input
          value={names.user_name}
          onChange={(e) => onUserName(e)}
          type="text"
          placeholder="내 이름"
        />
        <StartButton onClick={onStart}>시작하기</StartButton>
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
const Input = styled.input`
  width: 100%;
  margin-top: 50px;
  padding: 15px 20px;
  border-radius: 25px;
  border: 1px solid #f1f3f5;
  background-color: #fff;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`;
const StartButton = styled.button`
  margin-top: 30px;
  padding: 12px 30px;
  color: #fff;
  border-radius: 25px;
  border: 1px solid #495057;
  background-color: #495057;
`;
export default Start;
