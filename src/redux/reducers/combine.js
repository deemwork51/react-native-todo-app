import { combineReducers } from "redux";

import todoReducer from "./todo-reducer";
const reducers = combineReducers({
    todo: todoReducer,

});

export default reducers;
