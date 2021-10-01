import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// 회원가입, 로그인 정보를 firebase에 등록
import { auth } from "../../shared/firebase";
import firebase from "firebase/app";

// 액션 타입
const LOGOUT = "LOGOUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// 액션 생성 함수 createAction로 액션 생성함수를 만들때

const logOut = createAction(LOGOUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
// 리듀서를 handleActions로 했을 때
// const reducer = handleActions({ [LOGIN]: (state, action) => {} }, initialState);

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// 유저의 initialState
const user_initial = {
  user_name: "mida",
};

// 미들웨어 만들기
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(setUser(user));
    history.push("/");
  };
};

const signupFB = (id, pwd, name) => {
  return function (dispatch, getState, { history }) {
    console.log("signupFB");
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            dispatch(
              setUser({
                user_name: name,
                id: id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            history.push("/");
          })
          .catch((error) => {
            console.log("error  = ", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/weak-password") {
          alert("비밀번호 길이가 너무 짧습니다.");
        }
        console.log(errorCode, errorMessage);
        // ..
      });
  };
};

const loginFB = (id, pw) => {
  return function (dispatch, getState, { history }) {
    // 로그인 정보를 세션스토리지에 저장
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

    // 로그인 정보를 받아서 리듀서에 보냄
    auth
      .signInWithEmailAndPassword(id, pw)
      .then((user) => {
        console.log("login user == ", user);
        dispatch(
          setUser({
            user_name: user.user.displayName,
            id: id,
            user_profile: "",
            uid: user.user.uid,
          })
        );
        history.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
};

// 리덕스에 로그인 여부 저장하기 위한 함수
// 이미 로그인 된 상태(세션에 정보가 있다.)
// 파이어베이스에 로그인 되어 있으니까 자체적으로 저장된 것을
// 파이어베이스 인증 함수를 사용해서 가져와서 다시 리덕스에 넣어준다.
const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    // user가 있는지 없는지 확인하는 메소드
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
            id: user.email,
            uid: user.uid,
          })
        );
      } else {
        // 로그인이 되어있지 않으면, 리덕스에서도 로그아웃
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      // 현재 페이지에서 replace("/")로 페이지 바꿔치기 해준다.
      history.replace("/");
    });
  };
};

// 리듀서 만들기
// immer를 사용하기 위해 produce()를 사용
// immer 란?
// a라는 데이터를 불변성을 유지하고 싶으면 immer가 a-1을 만들어서 a-1을 고친다.
// immer를 쓰면 알아서 불변성을 지켜주기 때문에 편하게 사용가능.
// produce(state, (복사할 원본 값을 넘겨주는 draft를 받아온다.) => {})
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        // 불변성을 유지하기 위해 draft.user
        // 중간에 payload를 거치고 변경할 값
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// 액션 생성함수를 export 한다.
const actionCreators = {
  logOut,
  getUser,
  loginAction,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };
