import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import bucket from "./modules/bucket";

// 미들웨어도 하나로 적용할 수 있다.
const middlewares = [thunk];
// 리듀서말고 옵셔널한 것들의 모음 enhancer. 미들웨어들을 풀어서 추가해줄 수 있다.
const enhancer = applyMiddleware(...middlewares);

// 리듀서는 여러개 쓸 수 있기 때문에 리듀서를 싹 다 묶고, 그외 필요한 옵션들을 추가해서 통으로 묶어서 createStore에 넘겨준다.
// 그렇게 store가 만들어진다.
// combineReducers 리듀서를 묶는 함수
// 리듀서를 모두 묶은 아이들을 rootReducer라고함
// 리듀서가 여러개면 combineReducers({ bucket, bucket2, bucket3 });
const rootReducer = combineReducers({ bucket });

// 스토어를 만든다
// createStore() 첫번째 인자는 리듀서
const store = createStore(rootReducer, enhancer);

export default store;
