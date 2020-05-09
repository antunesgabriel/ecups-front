import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

// Actions e Types
const { Types, Creators: AuthActions } = createActions({
  signIn: ["email", "password", "prefix"],
  signInSuccess: ["token"],
  signInFailure: ["erro"],
  signOut: null,
  clearErro: null,
});

export const AuthTypes = Types;

export default AuthActions;

// Initial state  and reducers
const INITIAL_STATE = Immutable({
  loading: false,
  signInErro: null,
  signed: false,
  token: null,
});

const HANDLERS = {
  [AuthTypes.SIGN_IN]: (state) => Immutable(state).merge({ loading: true }),

  [AuthTypes.SIGN_IN_SUCCESS]: (state, { token }) =>
    Immutable(state).merge({ loading: false, token, signed: true }),

  [AuthTypes.SIGN_IN_FAILURE]: (state, { erro }) =>
    Immutable(state).merge({
      loading: false,
      signInErro: erro,
      token: null,
      signed: false,
    }),
  [AuthTypes.SIGN_OUT]: (state) =>
    Immutable(state).merge({
      loading: false,
      token: null,
      signed: false,
      signInErro: null,
    }),
  [AuthTypes.CLEAR_ERRO]: (state) =>
    Immutable(state).merge({ signInErro: null }),
};

export const authReducer = createReducer(INITIAL_STATE, HANDLERS);
