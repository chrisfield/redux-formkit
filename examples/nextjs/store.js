import { createStore } from 'redux';
import rootReducer from './reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

export const initStore = (initialState = {}) => (
  createStore(rootReducer, initialState, devToolsEnhancer())
);
