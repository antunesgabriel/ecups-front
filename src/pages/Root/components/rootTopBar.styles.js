import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    width: "100%",
    backgroundColor: theme.palette.background.light,
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
    color: theme.palette.icon,
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
  icon: {
    color: theme.palette.icon,
  },
  inline: {
    display: "inline",
    marginRight: theme.spacing(1),
  },
  nofitications: {
    maxWidth: 200,
    minWidth: 150,
    whiteSpace: "normal",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
  },
}));
