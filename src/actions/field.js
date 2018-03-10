import {
  FIELD_UPDATE,
  FIELDS_UPDATE,
  FIELD_SET_ERROR,
  REGISTER_FIELD,
  DEREGISTER_FIELD,
  REGISTER_FIELD_ARRAY,
  DEREGISTER_FIELD_ARRAY,
  ARRAY_PUSH,
  ARRAY_REMOVE,
  INCREMENT_ERROR_COUNT
} from './types';

export const fieldActionTypes = [
  FIELD_UPDATE,
  FIELDS_UPDATE,
  FIELD_SET_ERROR,
  REGISTER_FIELD,
  DEREGISTER_FIELD,
  REGISTER_FIELD_ARRAY,
  DEREGISTER_FIELD_ARRAY,
  ARRAY_PUSH,
  ARRAY_REMOVE,
  INCREMENT_ERROR_COUNT
];

export const updateField = (form, field, value) => (
  {type: FIELD_UPDATE, form:form, field: field, value: value}
);

export const updateFields = (form, payload) => (
  {type: FIELDS_UPDATE, form: form, payload}
);

export const setFieldError = (form, field, error, touched) => (
  {type: FIELD_SET_ERROR, form: form, field: field, error: error, touched: touched}
);

export const incrementErrorCount = (form, amount) => (
  {type: INCREMENT_ERROR_COUNT, form: form, amount: amount}
);

export const registerField = (form, field) => (
  {type: REGISTER_FIELD, form: form, field: field}
);

export const deregisterField = (form, field) => (
  {type: DEREGISTER_FIELD, form: form, field: field}
);

export const registerFieldArray = (form, fieldArray) => (
  {type: REGISTER_FIELD_ARRAY, form: form, fieldArray: fieldArray}
);

export const deregisterFieldArray = (form, fieldArray) => (
  {type: DEREGISTER_FIELD_ARRAY, form: form, fieldArray: fieldArray}
);

export const arrayPush = (form, fieldArray, payload) => (
  {type: ARRAY_PUSH, form: form, fieldArray: fieldArray, payload: payload}
);

export const arrayRemove = (form, fieldArray, index) => (
  {type: ARRAY_REMOVE, form: form, fieldArray: fieldArray, index: index}
);

