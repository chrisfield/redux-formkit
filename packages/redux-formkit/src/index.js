export { Form, useForm } from "./form";
export {
  initFormState as initFormStateAction,
  updateFields as updateFieldsAction
} from "./actions";

export {default as FormStateContext} from "./form-state-context";
export {default as FormStateProvider} from "./form-state-provider";
export {default as formReducer} from "./reducers";
export {default as Field} from "./field";
export {default as FieldArray} from "./field-array";
export {default as SubmissionError} from "./submission-error";
export {default as useFormReducer}  from './use-form-reducer';
export {default as useField} from './use-field';
export {default as useFieldArray} from './use-field-array';

import {updateField} from "./actions";

export const updateFieldAction = (field, value) => (
  {field, ...updateField(value)}
);