import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "column",
    padding: theme.spacing(2),
    background:
      "linear-gradient(to right bottom, rgba(38,41,54,0.8), rgba(38,41,54,0.9)), url(/img/wallpaper6.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.background.default,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3),
    borderRadius: 10,
    width: "100%",
    maxWidth: 500,
    minWidth: 200,
    marginBottom: theme.spacing(3),
  },
  header: {
    textAlign: "center",
  },
  h1: {
    color: "#fff",
    marginTop: 0,
    fontSize: theme.typography.h1,
  },
  form: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  formFooter: {
    marginTop: theme.spacing(2),
  },
}));
