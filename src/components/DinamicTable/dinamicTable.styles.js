import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  actions: {
    justifyContent: "flex-end",
  },
  table: {
    minWidth: 1080,
  },
  scrollX: {
    [theme.breakpoints.down("md")]: {
      overflowX: "scroll",
    },
    padding: 0,
  },
  tableRow: {
    padding: theme.spacing(2),
  },
  tableEmpty: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  on: {
    color: theme.palette.success.main,
  },
}));
