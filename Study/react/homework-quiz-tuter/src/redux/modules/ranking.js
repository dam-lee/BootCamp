// 1. 랭킹 정보
// 2. 랭킹 정보에 하나를 더 추가해 준다. (추가 된 정보는 퀴즈 푼 유저의 정보{점수,이름,메세지})

const ADD_RANK = "ranking/ADD_RANK";

export const addRank = (user_ranking) => {
  return { type: ADD_RANK, user_ranking };
};

const initialState = {
  ranking: [
    { score: 60, user_name: "이루이", message: "안녕 아이유" },
    { score: 80, user_name: "이미다", message: "나는 이미다야" },
    { score: 70, user_name: "아이유", message: "나는 아이유야" },
  ],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "ranking/ADD_RANK":
      const new_ranking_list = [...state.ranking, action.user_ranking];
      return { ...state, ranking: new_ranking_list };

    default:
      return state;
  }
}
