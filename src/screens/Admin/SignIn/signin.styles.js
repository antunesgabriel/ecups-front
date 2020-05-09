import { makeStyles } from "@material-ui/core/styles";

// .wrapper {
//   height: 100%;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   .content {
//     background-color: #292C3A;
//     padding: 30px 15px;
//     border-radius: 10px;
//     width: 100%;
//     max-width: 500px;
//     min-width: 200px;

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "column",
    padding: theme.spacing(2),
    background:
      "linear-gradient(to right bottom, rgba(38,41,54,0.8), rgba(38,41,54,0.9)), url(/img/wallpaper.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#262936",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  content: {
    backgroundColor: "#292C3A",
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
