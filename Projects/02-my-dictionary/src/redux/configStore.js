import { createStore, combineReducers } from "redux";
import dictionary from "./modules/dictionary";

const rootReducer = combineReducers({ dictionary });

const store = createStore(rootReducer);

export default store;
