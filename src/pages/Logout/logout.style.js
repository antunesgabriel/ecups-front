import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "column",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  text: {
    marginTop: theme.spacing(2),
  },
}));
