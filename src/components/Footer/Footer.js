import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 4),
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.text.disable,
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
          href="http://localhost:3000"
          target="_blank"
          className={classes.link}
        >
          eCups
        </Link>
        . 2020
      </Typography>
      <Typography variant="caption">Seja um Pro Player!</Typography>
    </div>
  );
};

export default Footer;
