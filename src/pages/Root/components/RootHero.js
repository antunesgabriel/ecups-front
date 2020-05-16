import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const styles = (theme) => ({
  hero: {
    height: "100%",
    maxHeight: "50vh",
    minHeight: 300,
    width: "100%",
    marginTop: theme.spacing(8),
    backgroundImage:
      "linear-gradient(to top, rgba(38,41,54,0.9), rgba(38,41,54,0.7)), url(/img/bg-root.png)",
    backgroundColor: theme.palette.secondary.main,
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  center: {
    maxWidth: 400,
  },
  button: {
    minWidth: 130,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
    },
  },
  h1: {
    color: theme.palette.primary.light,
  },
  h5: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(3),
    },
    color: theme.palette.grey[500],
  },
  more: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
});

function RootHero({ classes, signed }) {
  return (
    <header className={classes.hero}>
      <div className={classes.center}>
        <Typography
          color="inherit"
          align="center"
          variant="h1"
          marked="center"
          className={classes.h1}
        >
          Seja um Pro-Player!
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={classes.h5}
        >
          Crie, gerencie e participe de campeonatos com eCups. A sua porta de
          entrada no mundo do e-sport =D
        </Typography>
        {!signed && (
          <div className={classes.buttons}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              className={classes.button}
              to="/player/signup"
              component={Link}
            >
              Criar Conta
            </Button>
            <Button
              color="primary"
              variant="outlined"
              size="large"
              className={classes.button}
              to="/player/signin"
              component={Link}
            >
              Fazer login
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  signed: state.auth.signed,
});

export default connect(mapStateToProps)(withStyles(styles)(RootHero));
