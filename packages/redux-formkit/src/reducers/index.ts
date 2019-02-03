import {actionTypes} from '../actions';
import formStatusAndFieldStatus from './form-status-and-field-status';
import fieldValues from './field-values';
import formErrors from './form-errors';

export const initialState = {};

const reducer = (state = initialState, action) => {
  if (action && actionTypes[action.type] && action.form) {
    const formState = state[action.form] || {};
    const {formStatus, fieldStatus} = formStatusAndFieldStatus(formState.formStatus, formState.fieldStatus, action);
    formStatus.isValid = formStatus.errorCount === 0;
    return {
      ...state,
      [action.form]: {
        formStatus,
        fieldStatus,
        fieldValues: fieldValues(formState.fieldValues, action),
        formErrors: formErrors(formState.formErrors, action)
      }
    };
  }
  return state;
};

export default reducer;
