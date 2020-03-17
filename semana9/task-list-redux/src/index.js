import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import App from './App';

import { createStore } from 'redux';
import rootReducer from './Reducers'

const GlobalStyle = createGlobalStyle`
`

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </ Provider >, 
  document.getElementById('root'));


