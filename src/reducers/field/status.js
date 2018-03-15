import {FIELD_SET_ERROR, REGISTER_FIELD, DEREGISTER_FIELD, ARRAY_REMOVE, INCREMENT_ERROR_COUNT, FIELDS_UPDATE} from '../../actions/types';
import setField from '../../morphers/setField';
import getFieldStatus from '../../selectors/getFieldStatus';
import getFieldValue from '../../selectors/getFieldValue';

export const initialState = {
  fieldCount: 0,
  errorCount: 0
};

const fieldStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_ERROR_COUNT:
      return {
        ...state,
        errorCount: state.errorCount + action.amount
      }
    case REGISTER_FIELD: {
      const state2 = {
        ...state,
        fieldCount: state.fieldCount + 1
      }
      return setField(state2, action.field, {touched: false});
    }
    case DEREGISTER_FIELD: {
      const state2 = { 
        ...state,
        fieldCount: state.fieldCount - 1
      };
      delete state2[action.field];
      return state2;
    }
    case FIELDS_UPDATE: {
      return {
        fieldCount: state.fieldCount,
        errorCount: 0
      };
    }
    case FIELD_SET_ERROR: {
      const fieldStatus = getFieldStatus(state, action.field);
      const touchedPayload = {};
      if (action.touched !== undefined) {
        touchedPayload.touched = action.touched;
      }
      return setField(
        state,
        action.field, 
        {touched: fieldStatus.touched, valid: !action.error, error: action.error, ...touchedPayload}
      );
    }
    case ARRAY_REMOVE: {
      const fieldArray = getFieldValue(state, action.fieldArray);
      const fieldArray2 = fieldArray.slice();
      fieldArray2.splice(action.index, 1);
      return setField(state, action.fieldArray, fieldArray2);
    }
    default:
      return state;
  }
};

export default fieldStatusReducer; 
