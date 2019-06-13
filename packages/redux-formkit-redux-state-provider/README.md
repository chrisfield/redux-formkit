# redux-formkit-redux-state-provider


## ⚠️ ATTENTION ⚠️
By default Redux-formkit does not use Redux - obviously this is not communicated well by the name. For this reason I have created [react-form-composer-redux-provider](https://www.npmjs.com/package/react-form-composer-redux-provider) which is 100% compatible and I recommend switching to it.

[![NPM Version](https://img.shields.io/npm/v/redux-formkit-redux-state-provider.svg?style=flat)](https://www.npmjs.com/package/redux-formkit-redux-state-provider)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-formkit-redux-state-provider.svg?style=flat)](https://npmcharts.com/compare/redux-formkit-redux-state-provider?minimal=true)

Use this module to connect [redux-formkit](https://www.npmjs.com/package/redux-formkit) to redux.  


## Motivation
From version 3 onwards redux-formkit uses react state to store form values - it does not, by default, use Redux. This module makes it easy to configure redux-formkit to use redux for the form state.


## Getting Started
Checkout [example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-redux)

To use it on you own project:
`npm install --save redux-formkit-redux-state-provider`


## Usage
Combine `formReducer` with your other reducers. Usually you will mount `formReducer` under 'form'. (To mount it elsewhere pass the mount-point key to `FormStateProvider` using prop `formReducerNamespace`).

Add one instance of the `FormStateProvider` anywhere below the react-redux provider and above forms in the component tree. 

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import FormStateProvider from "redux-formkit-redux-state-provider";
import { formReducer } from 'redux-formkit';
import MyForm from './my-form.jsx';

const reducer = combineReducers({
  form: formReducer // Use formReducerNamespace prop mount point is not 'form'
})

const store = createStore(
  reducer, undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const FormContainer = () => {
  return (
    <Provider store={store}>
      <FormStateProvider /* formReducerNamespace="my-forms" */ >
        <MyForm/>
      </FormStateProvider>
    </Provider>
  );
};

```