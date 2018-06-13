import {actionTypes} from '../actions';
import setField from '../state-utils/set-field';
import getField from '../state-utils/get-field';

export const initialFormStatus = {
  errorCount: 0,
  isSubmitting: false
};
export const initialFieldStatus = {};

const formStatusAndFieldStatusReducer = (formStatus = initialFormStatus, fieldStatus = initialFieldStatus, action) => {
  const errorCount = formStatus.errorCount;
  switch (action.type) {
    case actionTypes.START_SUBMIT: {
      return {
        formStatus: {...formStatus, isSubmitting: true},
        fieldStatus: fieldStatus
      }
    }
    case actionTypes.STOP_SUBMIT: {
      return {
        formStatus: {...formStatus, isSubmitting: false},
        fieldStatus: fieldStatus
      }
    }
    case actionTypes.UPDATE_FIELDS: { // todo: untouch all fields 
      const nextFieldStatus = {};
      Object.keys(fieldStatus).forEach(field => {
        const {touched, ...rest} = fieldStatus[field];
        nextFieldStatus[field] = rest;
      });
      return {
        formStatus: formStatus,
        fieldStatus: nextFieldStatus
      }
    }
    case actionTypes.DEREGISTER_FIELD: {
      const field = getField(fieldStatus, action.field) || {};
      console.log('deregister-field', action.field, errorCount);
      return {
        formStatus: {...formStatus, errorCount: errorCount - (field.error? 1: 0)},
        fieldStatus: setField(fieldStatus, action.field, undefined)
      };
    }
    case actionTypes.SET_FIELD_ERROR: {
      const field = getField(fieldStatus, action.field) || {};
      console.log('set-field-error', action.field, errorCount);
      return {
        formStatus: {...formStatus, errorCount: errorCount + (action.error? 1: 0) - (field.error? 1: 0)},
        fieldStatus: setField(fieldStatus, action.field, {...field, error: action.error, ...action.touchedPayload})
      };
    }
    case actionTypes.SET_FIELD_TOUCHED: {
      const field = getField(fieldStatus, action.field) || {};
      return {
        formStatus,
        fieldStatus: setField(fieldStatus, action.field, {error: field.error, touched: action.touched})
      };
    }
    default:
      return {formStatus, fieldStatus};
  }
};

export default formStatusAndFieldStatusReducer; 
