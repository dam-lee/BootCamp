import React from "react";
import { useSelector } from "react-redux";
import { ProgressBox, ProgressLine, Dot } from "./Style";
const Progress = () => {
  const quiz_done = useSelector((state) => state.quiz.quiz_done);
  const quiz_list = useSelector((state) => state.quiz.quiz_list);
  const user_list = useSelector((state) => state.quiz.user_answer);

  let count = 0;
  user_list.map((item) => {
    return quiz_done === user_list.length && count++;
  });

  return (
    <>
      <ProgressBox>
        <ProgressLine width={(count / quiz_list.length) * 100 + "%"} />
        <Dot />
      </ProgressBox>
    </>
  );
};

export default Progress;
