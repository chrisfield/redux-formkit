import { withDocs } from 'storybook-readme';
import readme from './simple-form.md'

import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer} from '../../packages/redux-formkit/src';
import {TextInput, NumberInput, Checkbox, RadioButton} from '../ui-components';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const Button = (props) => {
  const [state] = useFormReducer(useForm().name);
  return (
    <button {...props} style={{backgroundColor: state.formStatus.isValid? 'green': 'cyan'}} >Submit</button>
  );
};

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" initialValues={{rb2: 'G'}} onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, marginRight: '2rem' }}>
            <div>
              <TextInput name="fieldOne" label="Field One" required/>
              <NumberInput name="age" label="Age"/>
              <Checkbox name="isAgreed" label="Do you agree?"/>
            </div>
            <div>
              <RadioButton name="rb2" label="Red" value="R" />
              <RadioButton name="rb2" label="Green" value="G" />
              <RadioButton name="rb2" label="Blue" value="B" />
            </div>
            <Button/>
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
