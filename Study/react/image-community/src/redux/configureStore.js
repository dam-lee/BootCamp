// 스토어 만들때
// 1. import 할 것부터 처리해준다

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";

// 7. 스토어에 히스토리 넣어준다.
export const history = createBrowserHistory();

// 2. root reducer 만든다.
const rootReducer = combineReducers({
  user: User,
  post: Post,
  // 7-1 여기에 history추가
  // history와 router에 연결되었다.
  router: connectRouter(history),
});

// 3. 미들웨어를 준비한다.
// withExtraArgument thunk의 내장함수임 여기서 history를 넘겨준다.
// 미들웨어 thunk를 사용할때 (액션생성 함수가 실행되고 리듀서가 실행되기 전단계)
// 에서 history를 사용할 수 있다.
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려준다. (개발환경, 프로덕션(배포)환경 ...)
// process 따로 설치하는게 아니라 원래 있다
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 가져온다.
if (env === "development") {
  // require 는 패키지를 가져올때 쓴다. import를 안하고 require를 가져왔다.
  // redux-logger 라는거는 console.log에 찍힌다. 데이터에 어떤 액션이 담겨서 변경했다는
  // 내용이 콘솔창에 찍히기 때문에 배포했을 때 사용자에게 보여지면 안된다.
  // 그래서 굳이 import할 필요가 없기 때문에 if문 안에 들어왔을때만 가져오려고 require 썼다.
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 4. redux-devtools 설정
// redux-devtools 설정
// 자바스크립트 엔진은 v8엔진이 돌아가기만 하면 브라우저가 아니여도 돌아간다.
// 브라우저가 아닐때에는 window라는 객체가 없어서
// 브라우저일 때만 돌아가라고 설정해준거고, __REDUX_DEVTOOLS_EXTENSION_COMPOSE__는
// 리덕스 devtools가 깔려있으면 돌아가라고 써준것
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// 5. 미들웨어를 묶는다.
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 6. 미들웨어와 루트 리듀서를 엮어서 스토어를 만든다.
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
