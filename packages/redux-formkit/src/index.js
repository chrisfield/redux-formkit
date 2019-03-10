export { Form, useForm } from "./form";
export {initFormState as initFormStateAction} from "./actions";

export {default as FormStateContext} from "./form-state-context";
export {default as FormStateProvider} from "./form-state-provider";
export {default as formReducer} from "./reducers";
export {default as Field} from "./field";
export {default as FieldArray} from "./field-array";
export {default as SubmissionError} from "./submission-error";
export {default as useFormReducer}  from './use-form-reducer';
export {default as useField} from './use-field';
export {default as useFieldArray} from './use-field-array';

import {updateField, updateFields} from "./actions";

export const updateFieldsAction = (form, payload) => (
  {form, ...updateFields(payload)}
);

export const updateFieldAction = (form, field, value) => (
  {form, field, ...updateField(value)}
);
