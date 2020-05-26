import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 200,
    width: "100%",
    marginTop: theme.spacing(8),
  },
  paper: {
    // padding: theme.spacing(3),
  },
  image: {
    position: "relative",
    height: 300,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 200,
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  league: {
    zIndex: 100,
    marginBottom: theme.spacing(1),
  },
  show: {
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
    opacity: 0.7,
    transition: theme.transitions.create("opacity"),
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  right: {
    marginRight: theme.spacing(1),
  },
  subscribe: {
    borderColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.light,
    },
    color: theme.palette.success.main,
  },
}));
