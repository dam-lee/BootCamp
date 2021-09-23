// 1. 액션 타입 정의
const USERNAME = "quiz/USERNAME";
const QUIZANSWER = "quiz/QUIZANSWER";

const initialState = {
  user_name: "",
  quiz_name: "아이유",
  quiz_score: 0,
};

// 2. 액션 생성 함수
export const createUserName = (user_name) => {
  console.log("유저 이름 만드는 액션 생성 함수 = ", user_name);
  return { type: USERNAME, user_name };
};

export const updateQuiz = (quiz_score) => {
  return { type: QUIZANSWER, quiz_score };
};

// 3. 리듀서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USERNAME:
      return {
        user_name: action.user_name,
        quiz_name: state.quiz_name,
        quiz_score: state.quiz_score,
      };
    case QUIZANSWER:
      console.log("리듀서 state", state);
      console.log("리듀서 action", action);
      return {
        user_name: state.user_name,
        quiz_name: state.quiz_name,
        quiz_score: action.quiz_score,
      };
    default:
      return state;
  }
}
