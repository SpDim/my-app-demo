import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import { reducer } from './models/ticTacToe/reducer';
import { store } from './redux/store';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
); 