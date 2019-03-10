import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import FormStateProvider from "redux-formkit-redux-state-provider";
import { formReducer } from 'redux-formkit';
import MyForm from './my-form.jsx';

const reducer = combineReducers({
  // ...your other reducers here
  form: formReducer // Pass formReducerNamespace prop to FormStateProvider if mount point is not "form"
});

const store = createStore(
  reducer, undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const FormContainer = () => {
  return (
    <Provider store={store}>
      <FormStateProvider>
        <MyForm/>
      </FormStateProvider>
    </Provider>
  );
};

ReactDOM.render(<FormContainer />, document.getElementById("app"));


// The code below shows what this example woulkd be like without redux 
/*
import React from "react";
import ReactDOM from "react-dom";
import {FormStateProvider} from "redux-formkit";
import MyForm from './my-form.jsx';

const FormContainer = () => {
  return (
    <FormStateProvider>
      <MyForm/>
    </FormStateProvider>
  );
};

ReactDOM.render(<FormContainer />, document.getElementById("app"));

export default FormContainer;
*/