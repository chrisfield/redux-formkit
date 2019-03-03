import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {FormStateProvider} from 'redux-formkit';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <FormStateProvider>
    <App/>
  </FormStateProvider>,
 document.getElementById('root'));
registerServiceWorker();
