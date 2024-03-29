import { combineReducers } from "redux";

import { authReducer as auth } from "./authDuck";
import { feedbackReducer as feedback } from "./feedbackDuck";
import { userReducer as user } from "./userDuck";
// import { userReducer as user } from "./userDuck";

const reducers = combineReducers({ auth, feedback, user });

export default reducers;
