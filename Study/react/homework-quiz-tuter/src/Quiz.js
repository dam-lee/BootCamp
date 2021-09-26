import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAnswer } from "./redux/modules/quiz";
import Progress from "./Progress";
//
const Quiz = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // 유저가 문제 리스트의 몇번째를 풀고 있는지 배열로 하나씩 확인
  const quiz_list = useSelector((state) => state.quiz.quiz_list);
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list);

  // 점수 관리
  const setAnswer = (user_answer) => {
    dispatch(addAnswer(user_answer));
  };
  React.useEffect(() => {
    if (user_answer_list.length === quiz_list.length) {
      // 유저 점수 계산하기
      // 퀴즈가 가지고 있는 정답과 유저 리스트의 정답 비교
      //   const _score =
      //     (100 / quiz_list.length) * // 맞춘거를 계산
      //     quiz_list.filter((item, index) => {
      //       return item.answer === user_answer_list[index];
      //     }).length; // 맞춘 갯수
      //   const score = Math.round(_score);
      //   console.log(score);
      history.push("/score");
      return;
    }
  }, [user_answer_list]);
  // console.log에 에러뜸 없애기
  if (user_answer_list.length === quiz_list.length) {
    return null;
  }
  return (
    <>
      <div>
        <Progress />
        <p>{user_answer_list.length + 1}번 문제</p>
        <h3>{quiz_list[user_answer_list.length].question}</h3>
      </div>
      <div>
        <button
          onClick={() => setAnswer(true)}
          style={{
            padding: "10px 20px",
          }}
        >
          o
        </button>
        <button
          onClick={() => setAnswer(false)}
          style={{
            padding: "10px 20px",
          }}
        >
          x
        </button>
      </div>
    </>
  );
};

export default Quiz;
