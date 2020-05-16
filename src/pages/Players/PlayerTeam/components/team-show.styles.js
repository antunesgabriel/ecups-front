import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  shield: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
  file: {
    display: "none",
  },
  danger: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
    color: theme.palette.primary.light,
  },
  info: {
    backgroundColor: theme.palette.info.main,
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
    color: theme.palette.primary.light,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },

  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
