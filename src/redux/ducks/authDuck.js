import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import api from "~/services/api";

// Actions e Types
const { Types, Creators: AuthActions } = createActions({
  signIn: ["email", "password", "prefix"],
  signInSuccess: ["token"],
  signInFailure: null,
  signOut: null,
  updateToken: ["token"],
});

export const AuthTypes = Types;

export default AuthActions;

// Initial state  and reducers
const INITIAL_STATE = Immutable({
  loading: false,
  signed: false,
  token: null,
});

const HANDLERS = {
  [AuthTypes.SIGN_IN]: (state) => Immutable(state).merge({ loading: true }),

  [AuthTypes.SIGN_IN_SUCCESS]: (state, { token }) =>
    Immutable(state).merge({ loading: false, token, signed: true }),

  [AuthTypes.SIGN_IN_FAILURE]: (state) =>
    Immutable(state).merge({
      loading: false,
      token: null,
      signed: false,
    }),
  [AuthTypes.SIGN_OUT]: (state) =>
    Immutable(state).merge({
      loading: false,
      token: null,
      signed: false,
    }),
  [AuthTypes.UPDATE_TOKEN]: (state, { token }) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    return Immutable(state).merge({ loading: false, token, signed: true });
  },
};

export const authReducer = createReducer(INITIAL_STATE, HANDLERS);
