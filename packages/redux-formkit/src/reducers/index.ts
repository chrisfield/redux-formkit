import {actionTypes} from "../actions";
import fieldValues from "./field-values";
import formErrors from "./form-errors";
import formStatusAndFieldStatus from "./form-status-and-field-status";

export const initialState = {};

const reducer = (state = initialState, action) => {
  if (action && actionTypes[action.type] && action.form) {
    const formState = state[action.form] || {};
    const {formStatus, fieldStatus} = formStatusAndFieldStatus(formState.formStatus, formState.fieldStatus, action);
    formStatus.isValid = formStatus.errorCount === 0;
    return {
      ...state,
      [action.form]: {
        fieldStatus,
        fieldValues: fieldValues(formState.fieldValues, action),
        formErrors: formErrors(formState.formErrors, action),
        formStatus,
      },
    };
  }
  return state;
};

export default reducer;
