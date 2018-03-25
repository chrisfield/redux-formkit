import {FIELD_UPDATE, FIELDS_UPDATE, ARRAY_PUSH, ARRAY_REMOVE, REGISTER_FIELD_ARRAY} from '../../actions/types';
import getFieldValue from '../../selectors/getFieldValue';
import setField from '../../morphers/setField';

export const initialState = {};

const fieldValueReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIELDS_UPDATE:
      return action.payload;
    case FIELD_UPDATE:
      return setField(state, action.field, action.value);
    case ARRAY_PUSH: {
      const originalArray = getFieldValue(state, action.fieldArray) || [];
      const nextArray = originalArray.slice();
      nextArray.push(action.payload);
      return setField(state, action.fieldArray, nextArray);
    }
    case ARRAY_REMOVE: {
      const originalArray = getFieldValue(state, action.fieldArray) || [];
      const nextArray = originalArray.filter((item, index) => (index !== action.index));
      return setField(state, action.fieldArray, nextArray);
    }
    default:
      return state;
  }
};

export default fieldValueReducer; 
