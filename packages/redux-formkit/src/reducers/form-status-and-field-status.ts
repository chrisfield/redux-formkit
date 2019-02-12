import {actionTypes} from "../actions";
import getField from "../state-utils/get-field";
import setField from "../state-utils/set-field";

export const initialFormStatus = {
  errorCount: 0,
  isSubmitting: false,
  isValid: true,
};

export const initialFieldStatus = {};

const formStatusAndFieldStatusReducer = (formStatus = initialFormStatus, fieldStatus = initialFieldStatus, action) => {
  const errorCount = formStatus.errorCount;
  switch (action.type) {
    case actionTypes.INIT_FORM_STATE: {
      return {
        fieldStatus: {...initialFieldStatus, ...action.fieldStatus},
        formStatus: {...initialFormStatus, ...action.formStatus},
      };
    }
    case actionTypes.START_SUBMIT: {
      return {
        fieldStatus,
        formStatus: {...formStatus, isSubmitting: true},
      };
    }
    case actionTypes.STOP_SUBMIT: {
      return {
        fieldStatus,
        formStatus: {...formStatus, isSubmitting: false},
      };
    }
    case actionTypes.RESET_FIELDS_IS_DONE: {
      return {
        fieldStatus,
        formStatus: {...formStatus, isResetFieldsDue: false, isPrevalidatedOnServer: false},
      };
    }
    case actionTypes.UPDATE_FIELD: {
      const field = getField(fieldStatus, action.field) || {};
      return {
        fieldStatus: setField(fieldStatus, action.field, {
          ...field,
          customProps: action.customProps,
        }),
        formStatus,
      };
    }
    case actionTypes.UPDATE_FIELDS: {
      return {
        fieldStatus: initialFieldStatus,
        formStatus: {...initialFormStatus, isResetFieldsDue: true},
      };
    }
    case actionTypes.DEREGISTER_FIELD: {
      const field = getField(fieldStatus, action.field) || {};
      return {
        fieldStatus: setField(fieldStatus, action.field, undefined),
        formStatus: {...formStatus, errorCount: errorCount - (field.error ? 1 : 0)},
      };
    }
    case actionTypes.SET_FIELD_ERROR: {
      const field = getField(fieldStatus, action.field) || {};
      return {
        fieldStatus: setField(fieldStatus, action.field, {
          ...field,
          error: action.error,
        }),
        formStatus: {...formStatus, errorCount: errorCount + (action.error ? 1 : 0) - (field.error ? 1 : 0)},
      };
    }
    case actionTypes.SET_FIELD_TOUCHED: {
      const field = getField(fieldStatus, action.field) || {};
      return {
        fieldStatus: setField(fieldStatus, action.field, {error: field.error, touched: action.touched}),
        formStatus,
      };
    }
    default:
      return {formStatus, fieldStatus};
  }
};

export default formStatusAndFieldStatusReducer;
