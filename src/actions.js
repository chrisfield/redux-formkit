export const actionTypes = {
  INIT_FORM_STATE: 'INIT_FORM_STATE',
  PUSH_TO_FIELD_ARRAY: 'PUSH_TO_FIELD_ARRAY',
  REMOVE_FROM_FIELD_ARRAY: 'REMOVE_FROM_FIELD_ARRAY',
  UPDATE_FIELD: 'UPDATE_FIELD',
  UPDATE_FIELDS: 'UPDATE_FIELDS',
  SET_FIELD_TOUCHED: 'SET_FIELD_TOUCHED',
  START_SUBMIT: 'START_SUBMIT',
  STOP_SUBMIT: 'STOP_SUBMIT',
  DEREGISTER_FIELD: 'DEREGISTER_FIELD'
};

export const initFormState = (form) => (
  {type: actionTypes.INIT_FORM_STATE, form}
);

export const updateField = (field, value, error, touchedPayload, isValidated = false) => (
  {type: actionTypes.UPDATE_FIELD, field, value, error, touchedPayload, isValidated}
);

export const updateFields = (payload) => (
  {type: actionTypes.UPDATE_FIELDS, payload}
);

export const setFieldTouched = (field, touched) => (
  {type: actionTypes.SET_FIELD_TOUCHED, field, touched}
);

export const pushToFieldArray = (fieldArray, payload) => (
  {type: actionTypes.PUSH_TO_FIELD_ARRAY, fieldArray, payload}
);

export const removeFromFieldArray = (fieldArray, index) => (
  {type: actionTypes.REMOVE_FROM_FIELD_ARRAY, fieldArray, index}
);

export const deregisterField = (field) => (
  {type: actionTypes.DEREGISTER_FIELD, field}
);

export const startSubmit = () => (
  {type: actionTypes.START_SUBMIT}
);

export const stopSubmit = (errors) => (
  {type: actionTypes.STOP_SUBMIT, errors}
);
