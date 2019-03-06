import { useContext, useRef } from 'react';
import Context from './form-state-context';
import reducer, { initialState } from './reducers';
import { initFormState } from './actions';

const useFormReducer = (formName) => {
  const [state, dispatch] = useContext(Context);
  const formState = state[formName] ? state[formName]: reducer(initialState, initFormState(formName))[formName];
  const formDispatchRef = useRef((action) => {
    dispatch({...action, form: formName});
  });
  return [formState, formDispatchRef.current];
};

export default useFormReducer;