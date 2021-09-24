import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateQuiz } from "./redux/modules/quiz";
import {
  Container,
  Wrap,
  Title,
  QuizText,
  ImageWrap,
  Image,
  ButtonWrap,
  Button,
} from "./Style";
import image from "./image/cat01.jpg";
import Progress from "./Progress";

const Quiz = (props) => {
  const quiz_list = useSelector((state) => state.quiz.quiz_list);
  const user_answer_list = useSelector((state) => state.quiz.user_answer);

  const history = useHistory();
  const dispatch = useDispatch();

  const setAnswer = (user_answer) => {
    dispatch(updateQuiz(user_answer));
  };

  React.useEffect(() => {
    if (user_answer_list.length === quiz_list.length) {
      history.push("/score");
      return;
    }
  }, [user_answer_list]);

  if (user_answer_list.length === quiz_list.length) {
    return null;
  }
  return (
    <Container>
      <Wrap>
        <Progress />
        <Title>Quiz {user_answer_list.length + 1}.</Title>
        <ImageWrap>
          <Image src={image} alt="루이" />
        </ImageWrap>
        <QuizText>{quiz_list[user_answer_list.length].question}</QuizText>

        <ButtonWrap>
          <Button onClick={() => setAnswer(true)}>O</Button>
          <Button onClick={() => setAnswer(false)}>X</Button>
        </ButtonWrap>
      </Wrap>
    </Container>
  );
};

export default Quiz;
