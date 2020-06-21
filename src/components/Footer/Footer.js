import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 4),
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.text.disable,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  link: {
    color: theme.palette.text.disable,
    textDecoration: "underline",
  },
}));

const Footer = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body2">
        &copy;{" "}
        <Link
          component="a"
          href="https://github.com/antunesgabriel"
          target="_blank"
          className={classes.link}
        >
          Gabriel Antunes
        </Link>
        . 2020
      </Typography>
      <Typography variant="caption">Ecups - Seja um Pro Player!</Typography>
    </div>
  );
};

export default Footer;
