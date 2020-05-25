import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  empty: {
    width: "100%",
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 100,
    color: "#fff",
  },
  marginLabel: {
    marginBottom: theme.spacing(0.3),
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));
