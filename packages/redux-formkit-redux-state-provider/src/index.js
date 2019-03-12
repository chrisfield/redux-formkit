import React from 'react';
import { ReactReduxContext } from 'react-redux';
import {
  FormStateContext,
  updateFieldsAction as updateFields,
  updateFieldAction as updateField
} from 'redux-formkit';

export const updateFieldsAction = (form, payload) => (
  {form, ...updateFields(payload)}
);

export const updateFieldAction = (form, field, value) => (
  {form, ...updateField(field, value)}
);

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