import {fieldActionTypes} from '../actions/field';
import field from './field';

export const initialState = {};

const formReducer = (state = initialState, action) => {
  if (fieldActionTypes.indexOf(action.type) > -1) {
    return {
      ...state,
      [action.form]: field(state[action.form], action),
    };
  }
  return state;
};

export default formReducer;

