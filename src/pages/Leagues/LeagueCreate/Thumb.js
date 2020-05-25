import React from "react";
import { ButtonBase, Typography, makeStyles } from "@material-ui/core";

import { APIURL } from "~/services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: 220,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  league: {
    position: "absolute",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
    zIndex: 100,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundColor: theme.palette.background.default,
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.6,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
  none: {
    display: "none",
  },
}));

function getPreview(src) {
  if (!src) {
    return null;
  }
  if (typeof src === "string") {
    return `${APIURL}/files/${src}`;
  }

  return URL.createObjectURL(src);
}

export function Thumb({ thumb, handleChangeThumb, league }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonBase
        focusRipple
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        component="label"
      >
        <span
          className={classes.imageSrc}
          style={
            thumb
              ? {
                  backgroundImage: `url(${getPreview(thumb)})`,
                }
              : null
          }
        />
        <Typography
          component="h2"
          color="inherit"
          className={classes.league}
          variant="h2"
        >
          {league}
        </Typography>
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
          <Typography
            component="span"
            variant="subtitle2"
            color="inherit"
            className={classes.imageTitle}
          >
            Clique para alterar
            <span className={classes.imageMarked} />
          </Typography>
        </span>

        <input
          className={classes.none}
          color="primary"
          type="file"
          name="shield"
          accept="image/png,image/gif,image/jpeg"
          onChange={handleChangeThumb}
        />
      </ButtonBase>
    </div>
  );
}
