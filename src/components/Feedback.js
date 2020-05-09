import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeedbackActions from "~/redux/ducks/feedbackDuck";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Feedback = ({ feedback, clearFeedback }) => (
  <>
    {feedback.open && (
      <Snackbar
        open={feedback.open}
        autoHideDuration={5000}
        onClose={clearFeedback}
      >
        {feedback.open && (
          <Alert onClose={clearFeedback} severity={feedback.style}>
            {feedback.message}
          </Alert>
        )}
      </Snackbar>
    )}
  </>
);

const stateToProps = (state) => ({
  feedback: state.feedback,
});

const actionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export default connect(stateToProps, actionsToProps)(Feedback);
