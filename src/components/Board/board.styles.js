import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56,
  },
  avatarDown: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
    color: theme.palette.secondary.main,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.success.main,
  },
  differenceValue: {
    color: theme.palette.success.main,
    marginRight: theme.spacing(1),
  },
  differenceValueDown: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(1),
  },
  down: {
    color: theme.palette.error.main,
  },
  avatarInfo: {
    backgroundColor: theme.palette.info.main,
    height: 56,
    width: 56,
  },
}));
