import React, { useReducer } from 'react';
import { Context } from './form-state-context'; 
import reducer, { initialState as defaultInitialState} from './reducers';

const FormStateProvider = ({ initialState = defaultInitialState, children }) => {
  const stateAndDispatchInArray = useReducer(reducer, initialState);
  return (
    <Context.Provider value={stateAndDispatchInArray}>
      {children}
    </Context.Provider>
  );
};

export default FormStateProvider;