import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
  h4: {
    marginBottom: theme.spacing(4),
    color: theme.palette.primary.light,
  },
  img: {
    width: "100%",
    maxWidth: "100%",
    height: 250,
    [theme.breakpoints.down("sm")]: {
      height: 200,
    },
  },
  imgContainer: {
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
  },
  imgTitleContainer: {
    position: "absolute",
    padding: theme.spacing(2),
    background:
      "linear-gradient(to top, rgba(0,0,0, 0.9) 0%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0.8) 100%)",
    height: `calc(100% - ${theme.spacing(3)}px)`,
    left: 12,
    right: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  imgTitle: {
    color: theme.palette.primary.light,
    marginBottom: theme.spacing(0.4),
  },
  caption: {
    marginBottom: theme.spacing(1),
  },

  btn: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
    color: theme.palette.primary.light,
  },
}));
