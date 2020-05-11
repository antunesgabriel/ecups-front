import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators: UserActions } = createActions({
  setUser: ["user"],
  clearUser: null,
  setUserAvatar: ["filename"],
  updateUser: ["userData", "userId"],
  userFailure: null,
});

/* Types:
error
warning
info
success
*/
export const UserTypes = Types;

export default UserActions;

const INITIAL_STATE = Immutable({
  user: {
    name: null,
    email: null,
    surname: null,
    nickname: null,
    avatar: null,
    address: null,
    role: null,
    userId: null,
  },
  loading: false,
});

const HANDLERS = {
  [UserTypes.SET_USER]: (state, { user }) =>
    Immutable(state).merge({ user: { ...user }, loading: false }),
  [UserTypes.CLEAR_USER]: (state) =>
    Immutable(state).merge({
      name: null,
      email: null,
      surname: null,
      nickname: null,
      avatar: null,
      address: null,
      role: null,
      userId: null,
    }),
  [UserTypes.SET_USER_AVATAR]: (state, { filename }) =>
    Immutable(state).merge({ avatar: filename }),
  [UserTypes.UPDATE_USER]: (state) => Immutable(state).merge({ loading: true }),
  [UserTypes.USER_FAILURE]: (state) =>
    Immutable(state).merge({ loading: false }),
};

export const userReducer = createReducer(INITIAL_STATE, HANDLERS);
