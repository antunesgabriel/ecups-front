import React, { useState } from "react";
// import Avatar from "@material-ui/core/Avatar";
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

import { useStyles } from "./signin.styles";

function SignInPage({ signIn, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleClick = () => {
    signIn(email, password, "admin");
  };
  const handleSubmit = (e) => e.preventDefault();

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
                <Link href="#" variant="body2">
                  {"Não possui conta? Crie um"}
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
  bindActionCreators(AuthActions, dispatch);

export const SignIn = connect(mapStateToProps, mapActionsToProps)(SignInPage);
