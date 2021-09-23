import { createStore, combineReducers } from "redux";
import quiz from "./modules/quiz";

const rootReducer = combineReducers({ quiz });

const store = createStore(rootReducer);

export default store;
