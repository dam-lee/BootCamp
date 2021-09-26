import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import quiz from "./modules/quiz";
import user from "./modules/user";

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

const rootReducer = combineReducers({ quiz, user });

const store = createStore(rootReducer, enhancer);

export default store;
