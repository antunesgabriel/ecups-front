import { makeStyles } from "@material-ui/styles";

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
  progress: {
    marginTop: theme.spacing(2),
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
  file: {
    display: "none",
  },
  progressLabel: {
    marginBottom: theme.spacing(2),
  },
}));
