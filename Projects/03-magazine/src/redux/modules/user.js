import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// 1. action type
const GET_USER = "user/GET_USER";
const SET_USER = "user/SET_USER";

const initialState = {
  user: null,
  is_login: false,
};

// 2. action 생성 함수
export const set_user = createAction(SET_USER, (user) => ({ user }));

// 3. 비동기 통신

// 4. 리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) => {
      produce(state, (draft) => {
        console.log("리듀서 == ", action.payload);
        draft.user = action.payload.user;
      });
    },
  },
  initialState
);

// 액션 생성함수를 export 한다.
const actionCreators = { set_user };

export { actionCreators };
