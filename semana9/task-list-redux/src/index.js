import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducers'
import thunk from 'redux-thunk'

import App from './Containers/App';


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

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </ Provider >, 
  document.getElementById('root'));


