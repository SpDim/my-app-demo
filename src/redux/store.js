import { createStore } from 'redux';
import { reducer } from '../models/ticTacToe/reducer';
import { initialState } from '../models/ticTacToe/reducer';
  

export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);