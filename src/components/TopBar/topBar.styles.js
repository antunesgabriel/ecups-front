import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: theme.palette.background.default,
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  logo: {
    maxWidth: "100%",
    width: "auto",
    height: 36,
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));
