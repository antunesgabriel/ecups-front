import { put, call } from "redux-saga/effects";

// Local
import api from "~/services/api";
import AuthActions from "~/redux/ducks/authDuck";
import history from "~/utils/history";
import FeedbackActions from "../ducks/feedbackDuck";
import UserActions from "../ducks/userDuck";

export function* signIn({ email, password, prefix }) {
  try {
    const url = `${prefix ? "/" + prefix : ""}/home`;
    const { data } = yield call(api.post, "/auth", { email, password });
    api.defaults.headers.Authorization = `Bearer ${data._token}`;
    yield put(UserActions.setUser(data.user));
    yield put(FeedbackActions.clearFeedback());
    yield put(AuthActions.signInSuccess(data._token));
    history.push(url);
  } catch (err) {
    yield put(AuthActions.signInFailure());
    console.log(err.response);
    if (
      err.response &&
      err.response.data.statusCode < 500 &&
      err.response.data.message
    ) {
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
  }
}
