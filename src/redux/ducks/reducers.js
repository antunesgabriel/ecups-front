import { combineReducers } from "redux";

import { authReducer as auth } from "./authDuck";
// import { userReducer as user } from "./userDuck";

const reducers = combineReducers({ auth });

export default reducers;
