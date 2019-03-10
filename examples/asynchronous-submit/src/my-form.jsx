import React from 'react';
import { Form, useForm, useFormReducer, SubmissionError, useField } from 'redux-formkit';
import {TextInput, NumberInput, Checkbox} from './form-controls';

const ErrorMessage = ({name}) => {
  const { error } = useField(name);
  return error ? <p>{error}</p>: null;
};

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const MyForm = () => {  
  return (
    <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
      <ErrorMessage name="myFormSubmitErrorMessage"/>
      <div>
        <TextInput name="fieldOne" required/>
        <Checkbox name="isAgreed" label="Do you agree to big numbers (more than 42) ?"/>
        <NumberInput name="theNumber" required/>
      </div>
      <button>Submit</button>
      <TheFormState/>
    </Form>
  );
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function submitValues(values) {
  return sleep(1000).then(() => {                    // Simulate latency
    if (!values.isAgreed && values.theNumber > 42) { // Simulate serverside validation
      throw new SubmissionError({
        theNumber: "You didn't agree to numbers greater than 42!!",
        myFormSubmitErrorMessage: "Form not processed. Please make changes and try again."
      });
    }
    window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
  });
}

function clearValues(form) {
  form.updateFields({});
}

export default MyForm;