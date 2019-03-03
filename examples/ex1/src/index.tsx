import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ExampleForm from './components/ExampleForm';
import * as serviceWorker from './serviceWorker';

// import { FormStateProviderWithRedux } from './redux-formkit/form-state-context';
// import {Provider} from 'react-redux';
// import store from './store';

// ReactDOM.render(
//   <Provider store={store}>
//     <FormStateProviderWithRedux>
//       <App />
//     </FormStateProviderWithRedux>
//   </Provider>, 
//   document.getElementById('root'));


import { FormStateProvider } from './redux-formkit';
ReactDOM.render(
  <FormStateProvider>
      <ExampleForm/>
      <App />
  </FormStateProvider>, 
  document.getElementById('root'));  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
