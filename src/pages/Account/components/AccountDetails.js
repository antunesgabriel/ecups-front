import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import UserActions from "~/redux/ducks/userDuck";
import FeedbackActions from "~/redux/ducks/feedbackDuck";

import { formSchema } from "./account.form";

const AccountDetails = ({ className, user, updateUser, loading, ...rest }) => {
  const [values, setValues] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    nickname: user.nickname,
    password: undefined,
    oldPassword: undefined,
  });
  const [error, setError] = useState({
    has: false,
    field: null,
    message: null,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError({
      has: false,
      field: null,
      message: null,
    });
    const isValid = await validate();
    if (isValid) {
      updateUser(values, user.userId);
    }
  };

  const handleSubmit = (e) => e.preventDefault();

  const validate = async () => {
    try {
      await formSchema.validate(values);
      return true;
    } catch (err) {
      setError({
        field: err.path,
        has: true,
        message: err.message,
      });
      return false;
    }
  };

  return (
    <Card {...rest} className={className}>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <CardHeader
          subheader="Edite suas informações sempre que preciso"
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={error.has && error.field === "name"}
                helperText={
                  error.has && error.field === "name" ? error.message : null
                }
                label="Nome"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Sobrenome"
                error={error.has && error.field === "surname"}
                helperText={
                  error.has && error.field === "surname" ? error.message : null
                }
                margin="dense"
                name="surname"
                onChange={handleChange}
                required
                value={values.surname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={error.has && error.field === "email"}
                helperText={
                  error.has && error.field === "email" ? error.message : null
                }
                label="Email"
                margin="dense"
                name="email"
                type="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={error.has && error.field === "nickname"}
                helperText={
                  error.has && error.field === "nickname" ? error.message : null
                }
                label="Nickname"
                margin="dense"
                name="nickname"
                onChange={handleChange}
                type="text"
                value={values.nickname}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nova Senha"
                margin="dense"
                name="password"
                onChange={handleChange}
                type="text"
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Senha Anterior"
                margin="dense"
                name="oldPassword"
                onChange={handleChange}
                type="text"
                value={values.oldPassword}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Salvar"
            )}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  loading: state.user.loading,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators({ ...UserActions, ...FeedbackActions }, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(AccountDetails);
