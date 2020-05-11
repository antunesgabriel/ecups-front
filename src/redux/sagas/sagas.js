import { all, takeLatest } from "redux-saga/effects";

import rehydrate from "./rehydrate";
import { signIn } from "./authSaga";
import { userUpdate } from "./userSaga";

import { AuthTypes } from "../ducks/authDuck";
import { UserTypes } from "../ducks/userDuck";

function* sagas() {
  return yield all([
    takeLatest("persist/REHYDRATE", rehydrate),
    takeLatest(AuthTypes.SIGN_IN, signIn),
    takeLatest(UserTypes.UPDATE_USER, userUpdate),
  ]);
}

export default sagas;
