import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { setCookie, deleteCookie } from "../../shared/Cookie";

// 1. action type
const LOGOUT = "LOGOUT";
const SET_USER = "SET_USER";

const initialState = {
  user: null,
  is_login: false,
};

// 2. action 생성 함수
export const setUser = (user) => {
  return { type: SET_USER, user };
};
export const logout = (user) => {
  return { type: LOGOUT, user };
};

// 3. 비동기 통신
export const loginFB = (user_id, user_pw) => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth();
    // setPersistence firebase의 인증 상태 지속 유지
    setPersistence(auth, browserSessionPersistence).then((res) => {
      signInWithEmailAndPassword(auth, user_id, user_pw)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // user name을 가져와야한다. (로그인할때는 email, pw정보만 있으니까)
          dispatch(
            setUser({
              user_name: user.displayName,
              id: user_id,
              // user_profile: "",
              uid: user.uid,
            })
          );
          history.push("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log("error === ", errorMessage);
          alert(errorMessage);
        });
    });
  };
};

export const signupFB = (user_id, user_pw, user_name) => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user_id, user_pw)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: user_name,
          // photoURL: ""
        })
          .then(() => {
            // 성공했으면 로그인 상태로 변경
            dispatch(
              setUser({
                user_name: user_name,
                id: user_id,
                // user_profile: "",
                uid: user.uid,
              })
            );
            history.push("/");
          })
          .catch((error) => {
            console.log("error", error);
            alert(error);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        console.log("error ==== ", errorMessage);
      });
  };
};

export const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // 이미 로그인 된 상태라면
        // 세션이 유저의 정보를 가지고 있기 때문에 거기서 정보를 가져온다.
        // 그게 firebase의 onAuthStateChanged 함수이다. 그래서 id는 email로 넣어준다.
        dispatch(
          setUser({
            user_name: user.displayName,
            // user_profile: "",
            id: user.email,
            uid: uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  };
};

export const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logout());
        history.replace("/");
      })
      .catch((error) => {
        console.log("error === ", error);
        alert(error);
      });
  };
};

// 4. 리듀서
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "SET_USER": {
      setCookie("is_login", "success");
      return { is_login: true, user: action.user };
    }
    case "LOGOUT": {
      deleteCookie("is_login");
      return { is_login: false, user: null };
    }
    default:
      return state;
  }
}
