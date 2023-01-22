import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RTLLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import store from './store.js'
import { Provider } from "react-redux";

ReactDOM.render(
  <ChakraProvider theme={theme}>
      <Provider store={store}>
      <React.StrictMode>
        <ThemeEditorProvider>
          <HashRouter>
            <Switch>
              <Route path={`/auth`} component={AuthLayout} />
              <Route path={`/admin`} component={AdminLayout} />
              <Redirect from='/' to='/auth' />
            </Switch>
          </HashRouter>
        </ThemeEditorProvider>
      </React.StrictMode>
  </Provider>
    </ChakraProvider>,
  document.getElementById("root")
);
