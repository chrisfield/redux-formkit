import { createStore } from 'redux';
import rootReducer from './reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';


export const initializeStore = (initialState = {}) => (
  createStore(rootReducer, initialState, devToolsEnhancer())
);
