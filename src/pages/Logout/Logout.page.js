/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import AuthActions from "~/redux/ducks/authDuck";
import UserActions from "~/redux/ducks/userDuck";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import history from "~/utils/history";

import { useStyles } from "./logout.style";

function LogoutPage({ signOut, clearUser, setFeedback }) {
  useEffect(() => {
    const interval = setInterval(() => logout(), 2000);

    return () => clearInterval(interval);
  }, []);

  const classes = useStyles();

  const logout = async () => {
    clearUser();
    signOut();
    setFeedback("info", "Sessão finalizada, faça login novamente");
    history.push("/");
  };

  return (
    <main className={classes.wrapper}>
      <CircularProgress color="primary" size={30} />
      <Typography component="h2" className={classes.text}>
        Finalizando sessão...
      </Typography>
    </main>
  );
}

const actionsToProps = (dispatch) =>
  bindActionCreators(
    { ...AuthActions, ...UserActions, ...FeedbackActions },
    dispatch
  );

export default connect(null, actionsToProps)(LogoutPage);
