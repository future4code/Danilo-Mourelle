import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import App from './App';

import { createStore } from 'redux';
import rootReducer from './Reducers'

const GlobalStyle = createGlobalStyle`
body{
    margin:auto;
    width:700px;
    min-height:100vh;
    background-color: #f5f5f5;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    
  }
  *{
    box-sizing: border-box;
  }
`

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </ Provider >, 
  document.getElementById('root'));


