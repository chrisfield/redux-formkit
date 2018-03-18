import {
  FIELD_SET_ERROR,
  STOP_SUBMIT
} from '../../actions/types';
import setField from '../../morphers/setField';
import getFieldStatus from '../../selectors/getFieldStatus';
import getFieldValue from '../../selectors/getFieldValue';

const initialState = {};

const fieldErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case STOP_SUBMIT:
      return action.errors
    case FIELD_SET_ERROR: {
      const fieldStatus = getFieldStatus(state, action.field);
      return setField(
        state,
        action.field, 
        undefined
      );
    }
    default:
      return state;
  }
};

export default fieldErrorReducer; 
