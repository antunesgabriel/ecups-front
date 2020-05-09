import React, { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CircularProgress } from "@material-ui/core";

import Copyright from "~/components/Copyright";
import AuthActions from "~/redux/ducks/authDuck";
import FeedbackActions from "~/redux/ducks/feedbackDuck";

import { useStyles } from "./signIn.styles";
import { formSchema } from "./signIn.form";

function SignInPage({ signIn, loading, setFeedback }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    has: false,
    field: null,
  });

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleClick = async () => {
    const isValid = await validate();
    if (isValid) {
      loginPlayer();
    }
  };
  const handleSubmit = (e) => e.preventDefault();

  const validate = async () => {
    try {
      setError({
        field: null,
        has: false,
      });

      await formSchema.validate({
        email,
        password,
      });
      return true;
    } catch (err) {
      setError({
        field: err.path,
        has: true,
      });
      setFeedback("error", err.message);
      return false;
    }
  };

  const loginPlayer = () => {
    signIn(email, password, "player");
  };

  const classes = useStyles();

  return (
    <main className={classes.wrapper}>
      <Paper elevation={3} square className={classes.content}>
        <header className={classes.header}>
          <h1 className={classes.h1}>Bem vindo de volta</h1>
        </header>
        <section>
          <form action="POST" className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              error={error.has && error.field === "email"}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChangeEmail}
              value={email}
            />
            <TextField
              variant="outlined"
              error={error.has && error.field === "password"}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangePassword}
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              size="large"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? <CircularProgress color="inherit" /> : "Entrar"}
            </Button>
            <Grid container className={classes.formFooter}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" to="/player/signup" component={RouteLink}>
                  {"Não possui conta? Crie uma"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </section>
      </Paper>
      <Copyright />
    </main>
  );
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators({ ...AuthActions, ...FeedbackActions }, dispatch);

export const SignInPlayer = connect(
  mapStateToProps,
  mapActionsToProps
)(SignInPage);
