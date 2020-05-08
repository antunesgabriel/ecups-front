import { all, takeLatest } from "redux-saga/effects";

import rehydrate from "./rehydrate";

function* sagas() {
  return yield all([takeLatest("persist/REHYDRATE", rehydrate)]);
}

export default sagas;
