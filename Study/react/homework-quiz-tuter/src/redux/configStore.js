import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import quiz from "./modules/quiz";
import user from "./modules/user";
import ranking from "./modules/ranking";

const middlewares = [thunk];

const rootReducer = combineReducers({ quiz, user, ranking });
// 리듀서말고 옵셔널한 것들의 모음 enhancer
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;
