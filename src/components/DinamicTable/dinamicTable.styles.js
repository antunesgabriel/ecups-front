import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
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
  actions: {
    justifyContent: "flex-end",
  },
  tableRow: {
    padding: theme.spacing(4),
  },
}));
