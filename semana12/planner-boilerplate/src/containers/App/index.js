import React from "react";
import { createGlobalStyle } from 'styled-components'
import { StylesProvider } from '@material-ui/core/styles'
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "../../style/theme";
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "../../reducers";
import Planner from "../Planner";

const middlewares = [
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
];

const store = createStore(rootReducer, compose(...middlewares));

export const GlobalStayle = createGlobalStyle`
  body{
    background-color: #ffd290;
    min-height:100vh;
    margin:0;
  }
`

export const App = () => (
  <Provider store={store}>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStayle />
        <Planner />
      </MuiThemeProvider>
    </StylesProvider>
  </Provider>
);

export default App;
