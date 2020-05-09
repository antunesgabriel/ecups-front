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
import FeedbackActions from "~/redux/ducks/feedbackDuck";

import { useStyles } from "./signUp.styles";
import { formSchema } from "./singUp.form";
import api from "~/services/api";
import history from "~/utils/history";

function SignUpPage({ setFeedback }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    has: false,
    field: null,
  });

  const handleChangeKey = (e) => setKey(e.target.value);
  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeSurname = (e) => setSurname(e.target.value);
  const handleChangeNickname = (e) => setNickname(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleClick = async () => {
    setLoading(true);
    const isValid = await validate();
    if (isValid) {
      createAdmin();
    }
  };
  const handleSubmit = (e) => e.preventDefault();

  const validate = async () => {
    try {
      setError({
        field: null,
        has: false,
      });
      if (!password || password !== confirmPassword) {
        setError({
          field: "confirmPassword",
          has: true,
        });
        setFeedback("error", "Senha e senha de confirmação devem ser iguais");
        setLoading(false);
        return;
      }
      await formSchema.validate({
        name,
        surname,
        nickname,
        email,
        password,
        confirmPassword,
        key,
      });
      return true;
    } catch (err) {
      setLoading(false);
      setError({
        field: err.path,
        has: true,
      });
      setFeedback("error", err.message);
      return false;
    }
  };

  const createAdmin = async () => {
    try {
      const { data } = await api.post("/admin", {
        name,
        surname,
        nickname,
        email,
        password,
        confirmPassword,
        key,
      });
      setLoading(false);
      setFeedback("success", data.message);
      history.push("/admin/signin");
    } catch (err) {
      setLoading(false);
      const { response } = err;
      if (response) {
        setFeedback("error", response.data.message);
      }
    }
  };

  const classes = useStyles();

  return (
    <main className={classes.wrapper}>
      <Paper elevation={3} square className={classes.content}>
        <header className={classes.header}>
          <h1 className={classes.h1}>Criar conta ADMIN:</h1>
        </header>
        <section>
          <form action="POST" className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  error={error.has && error.field === "name"}
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  name="name"
                  autoFocus
                  onChange={handleChangeName}
                  value={name}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  error={error.has && error.field === "surname"}
                  required
                  fullWidth
                  id="surname"
                  label="Sobrenome"
                  name="surname"
                  autoFocus
                  onChange={handleChangeSurname}
                  value={surname}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  error={error.has && error.field === "email"}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoFocus
                  onChange={handleChangeEmail}
                  value={email}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  error={error.has && error.field === "password"}
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  onChange={handleChangePassword}
                  value={password}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  error={error.has && error.field === "confirmPassword"}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirme a senha"
                  type="password"
                  id="confirmPassword"
                  onChange={handleChangeConfirmPassword}
                  value={confirmPassword}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  error={error.has && error.field === "nickname"}
                  required
                  fullWidth
                  id="nickname"
                  label="Nickname"
                  name="nickname"
                  autoFocus
                  onChange={handleChangeNickname}
                  value={nickname}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  error={error.has && error.field === "key"}
                  margin="normal"
                  required
                  fullWidth
                  name="key"
                  label="Key"
                  type="password"
                  id="key"
                  onChange={handleChangeKey}
                  value={key}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleClick}
                  disabled={loading}
                >
                  {loading ? <CircularProgress color="inherit" /> : "Cadastrar"}
                </Button>
              </Grid>
            </Grid>

            <Grid container className={classes.formFooter}>
              <Grid item>
                <Link variant="body2" to="/admin/signin" component={RouteLink}>
                  {"Já possui conta? Faça login"}
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

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export const SignUpAdmin = connect(null, mapActionsToProps)(SignUpPage);
