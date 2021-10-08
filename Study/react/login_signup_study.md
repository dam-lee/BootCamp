# 쿠키

## 1. 로그인 했을 때의 쿠키 설정을 먼저 해준다. (쿠키 함수 생성)

- 쿠키 관련한 모듈 함수를 하나 만든다.
- 쿠키를 생성한 다음 가져오는 쿠키를 만든다. (쿠키를 가지고 와서 파싱해서 원하는 값으로 만들어줘야함)

```javascript
// shard(공용) 폴더에 Cookie 컴포넌트를 만든다.
// Cookie 컴포넌트
const getCookie = (name) => {
  let value = `; ${document.cookie}`;
  // ; 으로만 split 하면, for문을 돌려야 해서 이름을 붙여야한다
  // (`; ${name}=` => user_id ***
  let parts = value.split(`; ${name}=`);
  console.log("parts = ", parts);
  // 내가 찾는 쿠키가 없을 수 있기 때문에 조건문 처리
  if (parts.length === 2) {
    // 2면, 내가 찾는 쿠키가 있다.
    // 배열의 첫번째 항목은 필요없고 2번째만 필요하기 때문에
    // split로 ; 한번 더 자르고 그다음 pop()으로 배열의 맨 마지막것들은 다 사라지고, 첫번째꺼만 반환된다.
    // shift()는 앞에 것들을 모두 잘라내고 나머지 뒤에것들을 반환한다.
    return parts.pop().split(";").shift();
  }
};

// 이름과 어떤 값이 들어갈지 value 와 만료일인 exp를 가져와야 한다.
// exp = 5는, exp가 없어도 기본값으로 5로 설정할 수 있다.
const setCookie = (name, value, exp = 5) => {
  // 만료일 만들기
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString}`;
};

const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();
  document.cookie = `${name}=; expires=${date}`;
};

export { getCookie, setCookie, deleteCookie };
```

## 2. 로그인 컴포넌트에서 로그인을 했을때 쿠키를 설정해준다.

```jsx
const login = () => {
  if (!emailCheck(state.user_id)) {
    alert("아이디는 이메일 형식으로 입력해주세요");
  } else {
    setCookie("magazine", "mida", 3);
  }
};
```

# 로그인

- 클라이언트는 서버에 로그인 요청을 보내고 , 응답을 받은 후 토큰을 저장하기만 하면 사실상 끝이다.
- 하지만, 로그인이 된 이후에 처리해줘야 할 몇가지가 있다.
- 예를들면, 로그인한 회원의 header나 컴포넌트들을 변경해줘야 한다.
- 그런 처리들을 위해서 로그인 중인지 아닌지 판별할 수 있는 판별 값을 설정해줘야한다. (ex : is_login = false / true)

## 1. 쿠키 여부를 판단하는 state 생성

1. 쿠키 여부를 판단해서 보여지는 header 컴포넌트의 내용을 변경해준다.

```javascript
// header 컴포넌트
// 로그인 상태 여부를 state로 관리
const [is_login, setIsLogin] = React.useState(false);

const logout = () => {
  deleteCookie("magazine");
};

// 쿠키 여부에 따라 state의 상태값을 변경
React.useEffect(() => {
  let cookie = getCookie("magazine");
  if (cookie) {
    setIsLogin(true);
  } else {
    setIsLogin(false);
  }
}, [is_login]);
```

## 2. 로그인이 되어있는지 상태 값을 리덕스에서 관리

- 로그인이 되어있는지 상태여부는 리덕스에서 관리해야 한다. (현재 header에서는 로그인 로그아웃되었어도 새로고침을 해야 컴포넌트 내용이 변경된다.)
- 로그인에서 로그인이 성공했다는 응답을 받아야만 페이지 이동을 해줘야한다.
- 리덕스에서는 useHistory로 history 객체를 쓸 수 없다. (컴포넌트에서만 가능)
- 리덕스에서 응답을 성공 했을때 페이지 이동을 해주기 위해 패키지 설치를 해준다.

```jsx
yarn add history@4.10.1 connected-react-router@6.8.0
yarn add immer redux-actions
// history@4.10.1 connected-react-router@6.8.0 는 리덕스에서 history를 사용하기 위해

// redux-actions는 타입 생성 및 액션 생성 함수, 리듀서 작성등 코드가 길어지기 때문에
// 이런 귀찮은 작업을 좀 더 간결하게 작성해줄 수 있는 패키지
// immer 는 불변성을 유지 시켜주기 때문에 우리가 더이상 불변성에 대해서 고민할 필요가 없어서 매우 유용한 패키지

// immer 사용할때
// state는 어떤 값을 복사할지, 복사는 draft로
produce(state, (draft) => {
    draft.user = action.payload.user;
});
```

## 3. user 리덕스 모듈 생성

- user에 관한 모든 내용을 한 파일로 만든다. (덕스구조)
- useHistory() 는 컴포넌트내에서 사용 가능하기 때문에 로그이 아직 다 처리가 안되었는데 먼저 페이지 이동이 될 수 있다.
- 이런 부분을 막기 위해 모듈에서 처리가 완료되면 페이지 이동할 수 있도록 처리해줘야 한다.

### 3-1. 로그인 관련 모듈을 만든다.

```javascript
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// 1. action type
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const GET_USER = "GET_USER";

const initialState = {
  user: null, // 로그인한 유저 정보들
  is_login: false, // 로그인을 했는지 여부 판단
};

// 2. action 생성 함수
export const login = createAction(LOGIN, (user) => ({ user }));
export const logout = createAction(LOGOUT, (user) => ({ user }));
export const get_user = createAction(GET_USER, (user) => ({ user }));

// 3. 비동기 통신

// 4. 리듀서
export default handleActions(
  {
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
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
const actionCreators = { login, logout, get_user };
export { actionCreators };
```

### 3-2. 스토어를 만든다.

- 스토어 만드는 것은 외우지 말고 필요할때마다 공식문서 보면서 갖다 쓴다.

```javascript
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

// 1. user의 리듀서를 가져옴
import User from "./modules/user";
import Magazine from "./modules/magazine";

// 9.
// history를 만든다
export const history = createBrowserHistory();

// 2.
const rootReducer = combineReducers({
  user: User,
  magazine: Magazine,
  // 10.
  // history를 리덕스에 넣어준다.
  // 만든 history와 라우터가 연결되서 스토어에 저장되기 때문에 모듈에서 사용가능
  router: connectRouter(history),
});

// 3. const middlewares = [thunk]
// 11. 미들웨어도 액션 생성함수에서 사용하기 때문에  [thunk.withExtraArgument({ history: history })]
const middlewares = [thunk.withExtraArgument({ history: history })];

// 4.
// 지금이 어느 환경인 지 알려준다. (개발환경, 프로덕션(배포)환경 ...)
// process 설치가 아니라 원래 있다.
const env = process.env.NODE_ENV;

// 5.
// 개발환경에서는 로거라는 걸 쓴다.
// 현재 개발환경일때 logger를 쓴다.
if (env === "development") {
  // require 는 패키지를 가져올때 사용한다.
  // logger는 콘솔에 찍히기 때문에 데이터의 값을 보여주면 안되서 import할 필요가 없어서 require를 쓴다.
  // import해서 가져오면 크기만 커짐.
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 6.
// 안써도 상관없지만 쓰면 편함
// 현재 돌아가는 환경이 브라우저일때만 사용하게
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// 7.
// composeEnhancers로 묶어준다.
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 8.
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
```

### 3-3. index.js 에 스토어를 연결해준다.

```javascript
// index.js
import { Provider } from "react-redux";
import store from "./redux/configureStore";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

### 3-4. APP.js 로 가서 history를 수정해줘야한다.

- 원래는 route로 history를 넣어줬는데 이제 모듈에서 만든 history로 store에 연결해줬기 때문이다.

```javascript
//APP.js
// 만든 history를 연결해준다.
import { connectRouter } from "connected-react-router";
import { history } from "./redux/configureStore";
// BrowserRouter -> connectRouter 로 변경
<ConnectedRouter history={history}>
  <GlobalStyle />
  <Container>
    <Header />
    <Route path="/" exact component={MagazineList} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/create" exact component={MagazineWrite} />
    <Route path="/update/:id" exact component={MagazineWrite} />
    <Route path="/detail/:id" exact component={MagazineDetail} />
  </Container>
</ConnectedRouter>;
```

## 4. 로그인 페이지에서 리덕스 훅을 사용한다.

```javascript
// Login.js
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
const dispatch = useDispatch();
const [state, setState] = React.useState({
  user_id: "",
  user_pw: "",
});

const onClick = () => {
  if (!emailCheck(state.user_id)) {
    alert("아이디는 이메일 형식으로 입력해주세요");
  } else {
    dispatch(userActions.loginAction({ user_id: state.user_id }));
  }
};
```

## 5. user 모듈에서 작업을 해준다.

```javascript
// redux user.js
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(login(user));
    history.push("/");
  };
};
```

## 6. 로그인 된 부분을 확인되었으면 header 컴포넌트를 변경한다.

- Application Cookies에서 로그인 된 부분을 확인한 후 header 컴포넌트를 로그인 된 유저에 맞게 변경해준다.

```javascript
// Header.js
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // state로 관리하던 상태값을 이제 리덕스에서 가져올 수 있기 때문에 useSelector로 변경
  // const [is_login, setIsLogin] = React.useState(false);
  const is_login = useSelector((state) => state.user.is_login);

  const logout = () => {
    dispatch(userActions.logout({}));
  };

  return (
    <Grid
      is_flex
      justify="space-between"
      width="100%"
      padding="15px 20px"
      bg="#000"
    >
      <Button
        fontSize="26px"
        color="#fff"
        bg="#000"
        padding="0px"
        onClick={() => history.push(`/`)}
      >
        Magazine
      </Button>
      <Grid is_flex bg="#000">
        {!is_login ? (
          <>
            <Button
              bg="#000"
              color="#adb5bd"
              margin="0px 5px 0px 0px"
              padding="15px"
              hoverColor="#fff"
              onClick={() => history.push(`/login`)}
            >
              로그인
            </Button>
            <Button
              bg="#000"
              color="#adb5bd"
              padding="15px 0px 15px 15px"
              hoverColor="#fff"
              onClick={() => history.push(`/signup`)}
            >
              회원가입
            </Button>
          </>
        ) : (
          <>
            <Button
              bg="#000"
              color="#adb5bd"
              margin="0px 5px 0px 0px"
              padding="15px 0px"
              hoverColor="#fff"
              onClick={() => history.push(`/myPage`)}
            >
              마이페이지
            </Button>
            <Button
              bg="#000"
              color="#adb5bd"
              padding="15px"
              hoverColor="#fff"
              onClick={() => history.push(`/noti`)}
            >
              알림
            </Button>
            <Button
              bg="#000"
              color="#adb5bd"
              padding="15px 0px"
              hoverColor="#fff"
              onClick={logout}
            >
              로그아웃
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};
```

## 7. 로그인 된 여부에 따라 컴포넌트가 변경된걸 확인한 후 새로고침하면 정보가 날라간다.

- 여기서 다시 로그인 된 상태에서 새로고침하면, 정보가 날라간다.
- 리덕스에서 로그인 된 정보를 유지시켜주는 작업을 하지 않았기 때문이다.
- 로그인 유지 과정은 파이어베이스 콘솔을 진행하고 한다.

## 8. firebase console

#### 로그인 회원가입된 유저의 정보는 서버에 저장해야한다. (파이어베이스)

> 그러기 위해서 파이어베이스에 설정을 먼저 해준다.

- Authentication : 인증
- 이메일 비밀번호로 관리
- users에 회원가입된 유저들의 목록을 볼 수 있다.
- https://firebase.google.com/docs/auth/web/password-auth?authuser=0

## 9. firebase.js 에서 설정

- yarn add firebase
- user 모듈에서 로그인 정보를 변경한다.

```javascript
// user.js
// LOGIN 리듀서를 SET_USER로 변경한다.
// 로그인한 정보와 회원가입한 정보 모두 리덕스에 들어가야 하기 때문에.
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),


// 변경
export const setUser = createAction(SET_USER, (user) => ({ user }));
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success");
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
```

## 10. 회원가입 구현

- 유저의 정보를 파이어 스토어에 저장하기 위해서 파이어 스토어에서 필요한 모듈을 user.js에 가져온다.
- firebase 문서에 적혀있는 대로 (9버전) 비동기 작업을 해준다. (리듀서는 그대로)
- 회원가입 컴포넌트에서 dispatch로 signupFB 함수를 호출한다.
- 리덕스에 email, pw 말고 유저 이름도 추가해야 하기 때문에 firebase의 문서에 나와있는 프로필 업데이트의 내용으로 리덕스에 추가해준다.

```javascript
// user.js
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// 회원가입 비동기
const signupFB = (user_id, user_pw, user_name) => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user_id, user_pw)
      .then((userCredential) => {
        const user = userCredential.user;
        //닉네임 추가는 독스에서 사용자관리 사용자 프로필 업데이트 참고
        updateProfile(auth.currentUser, {
          displayName: user_name,
          // photoURL: ""
        })
          .then(() => {
            // 회원가입이 성공했으면 로그인 상태로 변경하기 위해서 리덕스에 유저 정보를 추가
            dispatch(
              setUser({
                user_name: user_name,
                id: user_id,
                user_profile: "",
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

// 회원가입 컴포넌트
dispatch(userActions.signupFB(state.user_id, state.user_pw, state.user_name));
```

## 11. 로그인 구현

- 처음 쿠키 테스트하려고 만들었던 user.js의 로그인 함수는 지운다.

```javascript
// 지움
const loginAction = (user) => {
  return function (dispatch, getState, { history }) {
    dispatch(setUser(user));
    history.push("/");
  };
};
```

- 회원가입때와 마찬가지로 firebase에서 로그인 구현 방법을 찾아온다.
- 이메일 주소와 비밀번호로 사용자 로그인 처리
- 로그인할때는 아이디와 비밀번호밖에 없어서 setUser에 필요한 user_name값은 로그인 성공시의 user 값으로 넘겨준다.

```javascript
// user.js
const loginFB = (user_id, user_pw) => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, user_id, user_pw)
      .then((userCredential) => {
        const user = userCredential.user;
        // user name을 가져와야한다. (로그인할때는 email, pw정보만 있으니까)
        console.log("login user == ", user.displayName);
        dispatch(
          setUser({
            user_name: user.displayName,
            id: user_id,
            user_profile: "",
          })
        );
        history.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
};

// Login.js
const onClick = () => {
  if (!emailCheck(state.user_id) || state.user_id === "") {
    alert("아이디는 이메일 형식으로 입력해주세요");
    return;
  }
  if (state.user_pw === "") {
    alert("비밀번호를 입력해주세요");
    return;
  }
  dispatch(userActions.loginFB(state.user_id, state.user_pw));
};
```

## 12. 로그인 유지

- 로그인 유지는 현재 Application 의 indexedDB 에서 확인할 수 있다.
- firebase의 지원되는 인증 상태 지속성 유형
- 처음 cookie로 저장되었던 것을 SESSION 으로 변경

  > firebase.auth.Auth.Persistence.SESSION 'session' 현재의 세션이나 탭에서만 상태가 유지되며 사용자가 인증된 탭이나 창이 닫히면 삭제됨을 나타냅니다. 웹 앱에만 적용됩니다.

```javascript
// user.js

const loginFB = (user_id, user_pw) => {
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
              user_profile: "",
              uid: user.user.user.uid,
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
```

- session 에 api키값이 저장되는 것을 확인한 후, 이 api key값으로 로그인 유지를 시켜준다.

```javascript
//firebase.js
// apikey를 사용하기 위해 export함.
export const apiKey = firebaseConfig.apiKey;
```

- apikey는 세션과 리덕스 둘다 체크해야 한다.

```javascript
// header.js
import { apiKey } from "../shared/firebase";
// 세션 스토리지에서 key값을 복사해서 api key값으로 변경한다.
const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
// 세션 스토리지가 있는지 없는지 확인한다.
const is_session = sessionStorage.getItem(_session_key) ? true : false;
```

- 로그인이 되어 있는 상태인지 아닌지 리덕스에 데이터가 없기 때문에, 로그인 유무를 체크하는 함수를 만들어준다.
- firebase 문서 현재 로그인한 사용자 가져오기

```javascript
//user.js

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("login check fb user ====== ", user);
        // 이미 로그인 된 상태라면
        // 세션이 유저의 정보를 가지고 있기 때문에 거기서 정보를 가져온다.
        // 그게 firebase의 onAuthStateChanged 함수이다. 그래서 id는 email로 넣어준다.
        dispatch(
          setUser({
            user_name: user.displayName,
            user_profile: "",
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
```

- 로그인 체크 유무는 app.js부터 확인해야 된다.
- (페이지가 새로고침 되었을때부터 가져와야 하기 때문이다. 라우터가 app.js에 있으니까)

```javascript
// App.js
// 로그인 체크 유무 (새로고침시 App.js부터 시작된다. 라우터가 여기에 있기 때문)
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "./redux/modules/user";
import { apiKey } from "./shared/firebase";

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  // 세션 스토리지가 있는지 없는지 확인한다.
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  React.useEffect(() => {
    // 로그인이 되어있는지 체크한다.
    // session의 여부로 판단. header에서 해도 상관없다고함
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);
```

## 13. 로그아웃

- 로그아웃하면 리덕스의 로그아웃만 되기 때문에 파이어베이스에서도 로그아웃을 한다.

```javascript
//user.js

const logoutFB = () => {
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
```
