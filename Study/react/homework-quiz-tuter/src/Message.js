import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "./redux/modules/user";
import { addRank } from "./redux/modules/ranking";
import { db } from "./firebase";
import { collection, addDoc } from "@firebase/firestore";
const Message = () => {
  const history = useHistory();
  const quiz_name = useSelector((state) => state.quiz.quiz_name);
  const user_name = useSelector((state) => state.user.user_name);
  const dispatch = useDispatch();
  const quiz_list = useSelector((state) => state.quiz.quiz_list);
  const user_answer_list = useSelector((state) => state.quiz.user_answer_list);
  const _score =
    (100 / quiz_list.length) * // 맞춘거를 계산
    quiz_list.filter((item, index) => {
      return item.answer === user_answer_list[index];
    }).length; // 맞춘 갯수
  const score = Math.round(_score);
  const message_ref = React.useRef(null);
  return (
    <div>
      <img
        src="https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg"
        style={{ width: 100, height: 100, borderRadius: "50%" }}
      />
      <h3>{quiz_name}에게 남기는 한마디</h3>
      <input ref={message_ref} />
      <button
        onClick={async () => {
          dispatch(setMessage(message_ref.current.value));

          dispatch(
            addRank({
              score: score,
              user_name: user_name,
              message: message_ref.current.value,
            })
          );
          // 1. db 찾기
          // 2. collection 찾기
          // 3. addDoc 찾기
          const docRef = await addDoc(collection(db, "quizTuter"), {
            score: score,
            user_name: user_name,
            message: message_ref.current.value,
          });
          history.push("./ranking");
        }}
      >
        랭킹페이지로 이동
      </button>
    </div>
  );
};

export default Message;
