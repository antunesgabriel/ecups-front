import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "~/redux/store";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "~/redux/ducks/authDuck";
import UserActions from "~/redux/ducks/userDuck";
import FeedbackActions from "~/redux/ducks/feedbackDuck";

const ADMIN = process.env.REACT_APP_ADMIN_ROLE;

function RouteAdmin({
  component: Component,
  isPrivate,
  signOut,
  clearUser,
  setFeedback,
  ...rest
}) {
  const { signed } = store.getState().auth;
  const { role } = store.getState().user.user;

  if (signed && (!role || role.role !== ADMIN)) {
    setFeedback(
      "warning",
      "Você não possui permissão para acessar está pagina"
    );
    clearUser();
    signOut();

    return <Redirect to="/admin/signin" />;
  }

  if (!signed && isPrivate) {
    return <Redirect to="/admin/signin" />;
  }

  if (signed && !isPrivate && role && role.role === ADMIN) {
    return <Redirect to="/admin/home" />;
  }

  return <Route {...rest} component={Component} />;
}

const actionsToProps = (dispatch) =>
  bindActionCreators(
    { ...AuthActions, ...UserActions, ...FeedbackActions },
    dispatch
  );

export default connect(null, actionsToProps)(RouteAdmin);
