import { put, call } from "redux-saga/effects";

// Local
import api from "~/services/api";
import FeedbackActions from "../ducks/feedbackDuck";
import UserActions from "../ducks/userDuck";
import AuthActions from "../ducks/authDuck";

export function* userUpdate({ userData, userId }) {
  try {
    const endPoint = `/user/${userId}`;
    const { data } = yield call(api.put, endPoint, { ...userData });

    api.defaults.headers.Authorization = `Bearer ${data._token}`;
    yield put(UserActions.setUser(data.user));
    yield put(FeedbackActions.clearFeedback());
    yield put(AuthActions.signInSuccess(data._token));
    yield put(FeedbackActions.setFeedback("success", data.message));
  } catch (err) {
    if (
      err.response &&
      err.response.data.statusCode < 500 &&
      err.response.data.message
    ) {
      yield put(UserActions.userFailure());
      yield put(
        FeedbackActions.setFeedback("error", err.response.data.message)
      );
      return;
    }
    yield put(
      FeedbackActions.setFeedback(
        "error",
        "Ops! Nos desculpe, algo de errado aconteceu, tente novamente mais tarde"
      )
    );
    yield put(UserActions.userFailure());
  }
}
