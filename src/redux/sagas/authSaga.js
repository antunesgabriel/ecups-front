import { put, call } from "redux-saga/effects";

// Local
import api from "~/services/api";
import AuthActions from "~/redux/ducks/authDuck";
import history from "~/utils/history";

export function* signIn({ email, password, prefix }) {
  try {
    const url = `${prefix ? "/" + prefix : ""}/dashboard`;
    const { data } = yield call(api.post, "/auth", { email, password });
    console.log(data, url);
    // api.defaults.headers.Authorization = `Bearer ${data._token}`;
    // // yield put(UserActions.requestUserSuccess(data.user));
    // yield put(AuthActions.signInSuccess(data._token));
    // history.push(url);
  } catch (err) {
    if (
      err.response &&
      err.response.data.statusCode < 500 &&
      err.response.data.message
    ) {
      yield put(
        AuthActions.signInFailure({ message: err.response.data.message })
      );
      return;
    }
    yield put(
      AuthActions.signInFailure({
        message:
          "Todo mundo erra, nós também erramos, tente novamente mais tarde",
      })
    );
  }
}
