import { withDocs } from 'storybook-readme';
import readme from './README.md'

import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer} from '../../packages/redux-formkit/src';
import {TextInput, NumberInput, Checkbox, RadioButton} from '../form-controls';

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
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div>
          <TextInput name="fieldOne" required/>
          <NumberInput name="age"/>
          <Checkbox name="isAgreed" label="Do you agree?"/>
        </div>
        <div>"
          <RadioButton name="rb2" label="Red" value="R" />
          <RadioButton name="rb2" label="Green" value="G" />
          <RadioButton name="rb2" label="Blue" value="B" />
        </div>
        <button>Submit</button>
        <div>
          <label>Values:</label>
            <TheFormState/> 
        </div>        
      </Form>
    </FormStateProvider>
  );
};

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearValues(form) {
  form.updateFields({});
}

export default withDocs(readme, () => <MyForm/>);
