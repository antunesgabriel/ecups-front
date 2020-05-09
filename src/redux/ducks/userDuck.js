import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators: UserActions } = createActions({
  setUser: ["user"],
  clearUser: null,
  setUserAvatar: ["filename"],
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
  name: null,
  email: null,
  surname: null,
  nickname: null,
  avatar: null,
  address: null,
  role: null,
  userId: null,
});

const HANDLERS = {
  [UserTypes.SET_USER]: (state, { user }) =>
    Immutable(state).merge({ ...user }),
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
};

export const userReducer = createReducer(INITIAL_STATE, HANDLERS);
