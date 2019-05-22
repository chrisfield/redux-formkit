import React from 'react';
import { Form } from 'redux-formkit';
import {TextInput, NumberInput, Checkbox, RadioButton} from './form-controls';

const MyForm = () => {  
  return (
    <Form name="myForm" initialValues={{rb2: 'G'}} onSubmit={submitValues} onSubmitSuccess={clearValues}>
      <div>
        <TextInput name="fieldOne" required/>
        <NumberInput name="age"/>
        <Checkbox name="isAgreed" label="Do you agree?"/>
      </div>
      <div>
        <RadioButton name="rb2" label="Red" value="R" />
        <RadioButton name="rb2" label="Green" value="G" />
        <RadioButton name="rb2" label="Blue" value="B" />
      </div>
      <button>Submit</button>
    </Form>
  );
};

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearValues(form) {
  form.updateFields({rb2: 'R'});
}

export default MyForm;