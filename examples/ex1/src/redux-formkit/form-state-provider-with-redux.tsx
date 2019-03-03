import React from 'react';
import { ReactReduxContext } from 'react-redux';
import { Context } from './form-state-context';

const FormStateProviderWithRedux = ({ children }:any) => {
  return (
    <ReactReduxContext.Consumer>
      { (value: any) => (
          <Context.Provider value={[value.store.getState(), value.store.dispatch]}>
            {children}
          </Context.Provider>
        )
      }
    </ReactReduxContext.Consumer>
  );
};

export default FormStateProviderWithRedux;