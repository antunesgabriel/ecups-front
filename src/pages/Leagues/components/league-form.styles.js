import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  control: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  margin: {
    marginBottom: theme.spacing(2),
  },
  dates: {
    width: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  separate: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));
