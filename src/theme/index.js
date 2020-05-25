import { createMuiTheme } from "@material-ui/core";

import palette from "./palette";
import typography from "./typography";

const theme = createMuiTheme({
  palette,
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  overrides: {
    MUIRichTextEditor: {
      root: {
        width: "100%",
      },
      toolbar: {
        borderBottom: "1px solid gray",
        backgroundColor: palette.background.main,
      },
      editor: {
        backgroundColor: palette.background.default,
        padding: 15,
        minHeight: 150,
        maxHeight: 300,
      },
      placeHolder: {
        paddingLeft: 20,
        width: "100%",
        height: "100%",
      },
    },
  },
});

export default theme;
