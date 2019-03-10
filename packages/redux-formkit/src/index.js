import { Form } from "./form";
export { Form };

import  FormStateContext from "./form-state-context";
import  FormStateProvider from "./form-state-provider";
export {FormStateContext, FormStateProvider };

import formReducer from "./reducers";
export {formReducer};

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
  {form, field, ...updateField(value)}
);

import { useForm }  from './form';
import useFormReducer  from './use-form-reducer';
import useField from './use-field';
import useFieldArray from './use-field-array';

export {useForm, useFormReducer, useField, useFieldArray}
