import {
  FIELD_SET_ERROR,
  REGISTER_FIELD,
  DEREGISTER_FIELD,
  ARRAY_REMOVE,
  INCREMENT_ERROR_COUNT,
  FIELDS_UPDATE,
  TOUCH_FIELD,
  START_SUBMIT,
  STOP_SUBMIT} from '../../actions/types';
import setField from '../../morphers/setField';
import getFieldStatus from '../../selectors/getFieldStatus';
import getFieldValue from '../../selectors/getFieldValue';

export const initialState = {
  isSubmitting: false,
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
        isSubmitting: state.isSubmitting,
        errorCount: 0
      };
    }
    case TOUCH_FIELD: {
      const fieldStatus = getFieldStatus(state, action.field);
      if (fieldStatus.error && !action.touched) {
        return state;
      }
      return setField(
        state,
        action.field, 
        {...fieldStatus, touched: action.touched}
      );
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
    case START_SUBMIT:
      return {
        ...state,
        isSubmitting: true
      };
    case STOP_SUBMIT :
      return {
        ...state,
        isSubmitting: false
      };
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
