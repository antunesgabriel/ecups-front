import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";

const styles = (theme) => ({
  hero: {
    height: "100%",
    maxHeight: "50vh",
    minHeight: 300,
    width: "100%",
    marginTop: theme.spacing(8),
    backgroundImage:
      "linear-gradient(to right bottom, rgba(38,41,54,0.8), rgba(38,41,54,0.9)), url(/img/bg-root.jpg)",
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
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function RootHero(props) {
  const { classes } = props;

  return (
    <header className={classes.hero}>
      <div className={classes.center}>
        <Typography color="inherit" align="center" variant="h1" marked="center">
          Seja um Pro-Player!!
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          className={classes.h5}
        >
          Enjoy secret offers up to -70% off the best luxury hotels every
          Sunday.
        </Typography>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          className={classes.button}
          component="a"
          href="#"
        >
          Criar Conta
        </Button>
        <Typography variant="body2" color="inherit" className={classes.more}>
          Discover the experience
        </Typography>
      </div>
    </header>
  );
}

export default withStyles(styles)(RootHero);
