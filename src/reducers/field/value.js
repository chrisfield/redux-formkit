import {FIELD_UPDATE, FIELDS_UPDATE, ARRAY_PUSH, ARRAY_REMOVE, REGISTER_FIELD_ARRAY} from '../../actions/types';
import setField from '../../morphers/setField';

export const initialState = {};

const fieldValueReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIELDS_UPDATE:
      return {
        ...state,
        ...action.payload
      };
    case FIELD_UPDATE:
      return setField(state, action.field, action.value);
    case REGISTER_FIELD_ARRAY:
      return {
        [action.fieldArray]: [],
        ...state
      };
    case ARRAY_PUSH: {
      const originalArray = state[action.fieldArray] || []
      const nextArray = originalArray.slice();
      nextArray.push(action.payload);
      const nextState = {
        ...state,
        [action.fieldArray]: nextArray
      };
      return nextState;
    }
    case ARRAY_REMOVE: {
      const originalArray = state[action.fieldArray] || []
      const nextArray = originalArray.filter((item, index) => (index !== action.index));
      const nextState = {
        ...state,
        [action.fieldArray]: nextArray
      };
      return nextState;
    }
    default:
      return state;
  }
};

export default fieldValueReducer; 
