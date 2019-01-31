import {actionTypes} from '../actions';
import getField from '../state-utils/get-field';
import setField from '../state-utils/set-field';

export const initialState = {};

const valuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_FORM_STATE:
      return action.fieldValues;
    case actionTypes.UPDATE_FIELDS:
      return action.fieldValues;
    case actionTypes.UPDATE_FIELD:
      return setField(state, action.field, action.value);
    case actionTypes.PUSH_TO_FIELD_ARRAY: {
      const originalArray = getField(state, action.fieldArray) || [];
      const nextArray = originalArray.slice();
      nextArray.push(action.payload);
      return setField(state, action.fieldArray, nextArray);
    }
    case actionTypes.REMOVE_FROM_FIELD_ARRAY: {
      const originalArray = getField(state, action.fieldArray) || [];
      const nextArray = originalArray.filter((item, index) => (index !== action.index));
      return setField(state, action.fieldArray, nextArray);
    }
    case actionTypes.SET_FIELD_ERROR: {
      return setField(state, action.field, action.value);
    }
    default:
      return state;
  }
};

export default valuesReducer;
