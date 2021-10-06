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
// const add_user = createAction(ADD_USER, (user) => ({ user }));

// 3. 비동기 통신

// 4. 리듀서
export default handleActions({});
