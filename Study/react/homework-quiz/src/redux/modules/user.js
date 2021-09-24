const initialState = {
  user_name: "",
  ranking: [],
};
const USERNAME = "user/USERNAME";
const RANKING = "user/RANKING";
// const USERREMOVE = "user/USERREMOVE";
// 2. 액션 생성 함수
export const createUserName = (user_name) => {
  return { type: USERNAME, user_name };
};

export const createRanking = (user_info) => {
  return { type: RANKING, user_info };
};

// export const removeUser = (user_info) => {
//   return;
// };

// 3. 리듀서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USERNAME:
      return { ...state, user_name: action.user_name };
    case RANKING:
      const newRanking = [...state.ranking, action.user_info];
      return { ...state, ranking: newRanking };
    default:
      return state;
  }
}
