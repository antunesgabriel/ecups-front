import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 200,
    height: "100%",
    borderRight: "none",
  },
  root: {
    backgroundColor: theme.palette.background.light,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));
