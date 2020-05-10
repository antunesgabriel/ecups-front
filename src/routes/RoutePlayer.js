import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "~/redux/store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "~/redux/ducks/authDuck";
import UserActions from "~/redux/ducks/userDuck";
import FeedbackActions from "~/redux/ducks/feedbackDuck";

const PLAYER = process.env.REACT_APP_PLAYER_ROLE;

function RoutePlayer({
  component: Component,
  isPrivate,
  signOut,
  clearUser,
  setFeedback,
  ...rest
}) {
  const { signed } = store.getState().auth;
  const { role } = store.getState().user;

  if (signed && (!role || role.role !== PLAYER)) {
    setFeedback(
      "warning",
      "Você não possui permissão para acessar está pagina"
    );
    signOut();
    clearUser();

    return <Redirect to="/player/signin" />;
  }

  if (!signed && isPrivate) {
    return <Redirect to="/player/signin" />;
  }

  if (signed && !isPrivate && role && role.role === PLAYER) {
    return <Redirect to="/player/home" />;
  }

  return <Route {...rest} component={Component} />;
}

const actionsToProps = (dispatch) =>
  bindActionCreators(
    { ...AuthActions, ...UserActions, ...FeedbackActions },
    dispatch
  );

export default connect(null, actionsToProps)(RoutePlayer);
