import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './assets/css/font.css';
import './assets/css/responsive.css';
import './assets/css/App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';

ReactDOM.render(
  <App/>,
  document.getElementsByTagName('body')[0]
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();