import {createStore} from 'redux';

import rootReducer from './reducers/root';
import {devToolsEnhancer} from 'redux-devtools-extension';

const store = createStore(rootReducer, undefined, devToolsEnhancer());

export default store;
