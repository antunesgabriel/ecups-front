import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";

export default {
  black,
  white,
  type: "dark",
  primary: {
    contrastText: white,
    dark: "#79310C",
    main: "#FF7500",
    light: "#FEF4D9",
  },

  secondary: {
    contrastText: white,
    dark: "#E6EAF5",
    main: "#292C3A",
    light: "#07091B",
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  // text: {
  //   primary: colors.blueGrey[900],
  //   secondary: colors.blueGrey[600],
  //   link: colors.blue[600],
  // },
  background: {
    default: "#262936",
    paper: black,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};
