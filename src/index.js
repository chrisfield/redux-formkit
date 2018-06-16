import formkit from "./formkit";
export default formkit;

import formkitWithoutRedux from "./formkit-without-redux";
export {formkitWithoutRedux}

import formReducer from './reducers';
export {formReducer};


import FormStatus from "./form-status";
export {FormStatus};

import NamedValidationStatus from './named-validation-status';
export {NamedValidationStatus};

import Field from "./field";
export {Field};

import FieldArray from "./field-array";
export {FieldArray};

import SubmissionError from './submission-error';
export {SubmissionError};

import {updateFields, updateField} from './actions';

export const updateFieldsAction = (form, payload) => (
  {form, ...updateFields(payload)}
);

export const updateFieldAction = (form, field, value, error, touchedPayload) => (
  {form, ...updateField(field, value, error, touchedPayload)}
);
