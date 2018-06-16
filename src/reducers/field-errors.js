import {actionTypes} from '../actions';
import setField from '../state-utils/set-field';

export const initialState = {};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FIELDS:
      return {};
    case actionTypes.START_SUBMIT:
      return {};
    case actionTypes.STOP_SUBMIT:
      return action.errors;
    case actionTypes.UPDATE_FIELD:
      return setField(state, action.field, undefined);
    default:
      return state;
  }
};

export default errorsReducer; 
