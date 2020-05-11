import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 56,
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    minHeight: "calc(100% - 64px)",
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(2, 4),
  },
}));
