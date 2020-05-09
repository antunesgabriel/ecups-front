import "~/configs/ReactotronConfigs";
import React from "react";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-ui/styles";
import { Router } from "react-router-dom";
import Feedback from "~/components/Feedback";

import history from "~/utils/history";
import Routes from "~/routes/Routes";
import { store, persistor } from "~/redux/store";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <PersistGate persistor={persistor}>
          <Router history={history}>
            <Feedback />
            <Routes />
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
