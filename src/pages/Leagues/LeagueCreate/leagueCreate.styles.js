import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 100,
    color: "#fff",
  },
  content: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  instructions: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
  control: {
    width: "100%",
  },
  margin: {
    marginBottom: theme.spacing(3),
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
