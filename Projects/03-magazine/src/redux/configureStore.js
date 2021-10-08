import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

// 1. user의 리듀서를 가져옴
import User from "./modules/user";
import Magazine from "./modules/magazine";
import Image from "./modules/image";
// 9.
// history를 만든다
export const history = createBrowserHistory();

// 2.
const rootReducer = combineReducers({
  user: User,
  magazine: Magazine,
  image: Image,
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

// 원래 패키지 사용안하고 했던 스토어
// import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import magazine from "./modules/magazine";

// // 미들웨어도 하나로 적용할 수 있다.
// const middlewares = [thunk];
// // 리듀서말고 옵셔널한 것들의 모음 enhancer. 미들웨어들을 풀어서 추가해줄 수 있다.
// const enhancer = applyMiddleware(...middlewares);

// // 리듀서는 여러개 쓸 수 있기 때문에 리듀서를 싹 다 묶고, 그외 필요한 옵션들을 추가해서 통으로 묶어서 createStore에 넘겨준다.
// // 그렇게 store가 만들어진다.
// // combineReducers 리듀서를 묶는 함수
// // 리듀서를 모두 묶은 아이들을 rootReducer라고함
// // 리듀서가 여러개면 combineReducers({ bucket, bucket2, bucket3 });
// const rootReducer = combineReducers({ magazine });

// // 스토어를 만든다
// // createStore() 첫번째 인자는 리듀서
// const store = createStore(rootReducer, enhancer);

// export default store;
