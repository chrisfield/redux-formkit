import formkit from "./formkit";
export default formkit;

import connectWithoutRedux from "./connect-without-redux";
export {connectWithoutRedux};

import formReducer from "./reducers";
export {formReducer};

import FormStatus from "./form-status";
export {FormStatus};

import NamedValidationStatus from "./named-validation-status";
export {NamedValidationStatus};

import Field from "./field";
export {Field};

import FieldArray from "./field-array";
export {FieldArray};

import SubmissionError from "./submission-error";
export {SubmissionError};

import {initFormState as initFormStateAction, updateField, updateFields} from "./actions";

export {initFormStateAction};

export const updateFieldsAction = (form, payload) => (
  {form, ...updateFields(payload)}
);

export const updateFieldAction = (form, field, value) => (
  {form, ...updateField(field, value)}
);
