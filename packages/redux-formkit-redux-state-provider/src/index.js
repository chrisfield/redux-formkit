import React from 'react';
import { ReactReduxContext } from 'react-redux';
import { formStateContext as FormStateContext} from 'redux-formkit';

const FormStateProviderWithRedux = ({ children }) => {
  return (
    <ReactReduxContext.Consumer>
      { (value) => {
          console.log('value from consumer is', value);
          return (
            <FormStateContext.Provider value={[value.store.getState(), value.store.dispatch]}>
              {children}
            </FormStateContext.Provider>
          )
        }
      }
    </ReactReduxContext.Consumer>
  );
};

export default FormStateProviderWithRedux;