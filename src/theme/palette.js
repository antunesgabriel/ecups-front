import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#18181B";

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
    dark: "#06431E",
    main: "#208C25",
    light: "#DEF9D2",
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
  text: {
    primary: colors.grey[300],
    secondary: colors.grey[500],
    disable: colors.grey[500],
  },
  background: {
    default: "#202225",
    dark: "#0E0E10",
    main: "#202225",
    light: "#18181B",
    paper: black,
  },
  icon: colors.grey[500],
  divider: colors.grey[500],
};
