// 1. 액션 타입 정의

const ADDQUIZ = "quiz/ADDQUIZ";

const initialState = {
  quiz_name: "루이",
  quiz_score: [],
  quiz_list: [
    { question: "루이는 여자다", answer: false },
    { question: "루이는 러시안 블루라는 종이다.", answer: true },
    { question: "루이는 7살이다", answer: false },
  ],
  quiz_done: 0,
  user_answer: [],
};

export const updateQuiz = (user_answer) => {
  return { type: ADDQUIZ, user_answer };
};

// 3. 리듀서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADDQUIZ:
      const newAnswer = [...state.user_answer, action.user_answer];
      const newQuizDone = state.quiz_done + 1;
      return { ...state, user_answer: newAnswer, quiz_done: newQuizDone };
    default:
      return state;
  }
}
