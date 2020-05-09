import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators: FeedbackActions } = createActions({
  setFeedback: ["style", "message"],
  clearFeedback: null,
});

/* Types:
error
warning
info
success
*/
export const FeedbackTypes = Types;

export default FeedbackActions;

const INITIAL_STATE = Immutable({
  message: null,
  style: null,
  open: false,
});

const HANDLERS = {
  [FeedbackTypes.SET_FEEDBACK]: (state, { style, message }) =>
    state.merge({ open: true, style, message }),
  [FeedbackTypes.CLEAR_FEEDBACK]: (state) =>
    state.merge({ open: false, message: null, style: null }),
};

export const feedbackReducer = createReducer(INITIAL_STATE, HANDLERS);
