import React from 'react';
import { ReactReduxContext } from 'react-redux';
import { FormStateContext } from 'redux-formkit';

const FormStateProviderWithRedux = ({ children, formReducerNamespace = 'form' }) => {
  return (
    <ReactReduxContext.Consumer>
      { (value) => (
          <FormStateContext.Provider value={[value.store.getState()[formReducerNamespace], value.store.dispatch]}>
            {children}
          </FormStateContext.Provider>
        )
      }
    </ReactReduxContext.Consumer>
  );
};

export default FormStateProviderWithRedux;