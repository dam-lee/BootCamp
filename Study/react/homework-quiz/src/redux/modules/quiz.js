import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

// 1. 액션 타입 정의
const USERANSWERQUIZLIST = "quiz/ADDQUIZ";
const LOAD = "quiz/LOAD";

const initialState = {
  quiz_name: "루이",
  quiz_score: [],
  quiz_list: [],
  quiz_done: 0,
  user_answer: [],
};

// 퀴즈 질문 리스트
export const loadQuiz = (quiz_list) => {
  return { type: LOAD, quiz_list };
};
// 유저가 푼 퀴즈 정답 리스트
export const userAnswerQuizList = (user_answer) => {
  return { type: USERANSWERQUIZLIST, user_answer };
};
// load 미들웨어
export const loadQuizList = () => {
  return async function (dispatch) {
    const quiz_data = await getDocs(collection(db, "quiz_list"));

    let quiz_list = [];
    quiz_data.forEach((quiz) => {
      quiz_list.push({ id: quiz.id, ...quiz.data() });
    });
    dispatch(loadQuiz(quiz_list));
  };
};

// 3. 리듀서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      const new_quiz_list = action.quiz_list;
      return { ...state, quiz_list: new_quiz_list };
    case USERANSWERQUIZLIST:
      const newAnswer = [...state.user_answer, action.user_answer];
      const newQuizDone = state.quiz_done + 1;
      return { ...state, user_answer: newAnswer, quiz_done: newQuizDone };

    default:
      return state;
  }
}
