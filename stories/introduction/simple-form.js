import { withDocs } from 'storybook-readme';
import readme from './simple-form.md'

import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer} from '../../packages/redux-formkit/src';
import {TextInput, NumberInput, Checkbox, RadioButton} from '../lib/form-controls';

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
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <div>
              <TextInput name="fieldOne" label="Field One" required/>
              <NumberInput name="age" label="Age"/>
              <Checkbox name="isAgreed" label="Do you agree?"/>
            </div>
            <div>"
              <RadioButton name="rb2" label="Red" value="R" />
              <RadioButton name="rb2" label="Green" value="G" />
              <RadioButton name="rb2" label="Blue" value="B" />
            </div>
            <button>Submit</button>
          </div>
          <div style={{
            flex: 2,
            flexDirection: 'column',
            display: 'flex',
            minWidth: '300px'
          }}>
            <TheFormState/> 
          </div>
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
