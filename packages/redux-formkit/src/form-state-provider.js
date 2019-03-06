import React, { useReducer } from 'react';
import { Context } from './form-state-context'; 
import reducer, { initialState } from './reducers';

const FormStateProvider = ({ children }) => {
  const stateAndDispatchInArray = useReducer(reducer, initialState);
  return (
    <Context.Provider value={stateAndDispatchInArray}>
      {children}
    </Context.Provider>
  );
};

export default FormStateProvider;