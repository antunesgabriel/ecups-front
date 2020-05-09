import { all, takeLatest } from "redux-saga/effects";

import rehydrate from "./rehydrate";
import { signIn } from "./authSaga";

import { AuthTypes } from "../ducks/authDuck";

function* sagas() {
  return yield all([
    takeLatest("persist/REHYDRATE", rehydrate),
    takeLatest(AuthTypes.SIGN_IN, signIn),
  ]);
}

export default sagas;
