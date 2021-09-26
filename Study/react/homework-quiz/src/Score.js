import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRankingFB } from "./redux/modules/user";
import { Container, Wrap, Title, Name, Input, RankinButton } from "./Style";

const Score = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const quiz_list = useSelector((state) => state.quiz.quiz_list);
  const user_answer_list = useSelector((state) => state.quiz.user_answer);
  const user_name = useSelector((state) => state.user.user_name);
  const user_text = React.useRef(null);

  // 점수 계산
  const _score =
    (100 / quiz_list.length) * // 맞춘거를 계산
    quiz_list.filter((item, index) => {
      return item.answer === user_answer_list[index];
    }).length; // 맞춘 갯수
  const score = Math.round(_score);

  const onRanking = () => {
    if (user_text.current.value === "") {
      return window.alert("한마디 글을 남겨주세요");
    }
    const newRanking = {
      name: user_name,
      score,
      message: user_text.current.value,
    };
    dispatch(createRankingFB(newRanking));
    history.push("/ranking");
    return;
  };

  return (
    <Container>
      <Wrap>
        <Title>
          <Name>루이</Name>퀴즈에 대한
          <br />
          {user_name}님의 점수는 <br /> {score}점!
        </Title>
        <Input
          ref={user_text}
          type="text"
          placeholder="한마디하고 랭킹 보러가기"
        />
        <RankinButton onClick={onRanking}>랭킹보러가기</RankinButton>
      </Wrap>
    </Container>
  );
};

export default Score;
