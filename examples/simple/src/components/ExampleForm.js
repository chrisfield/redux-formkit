import React from 'react';
import formkit from 'redux-formkit';
import {InputField, RadioField, CheckboxField} from './form-controls';
import {number, addCommas, requiredStr} from './form-controls/utils';

import { connect } from 'react-redux';

const ExampleForm = (props) => (
  <form className="example-form">

      <InputField
        name="field1"
        label="Required Field"
        validate={requiredStr}
      />

      <InputField
        name="theNumber"
        label="Numeric Field"
        formatToStore={number}
        formatFromStore={addCommas}
      />

      <CheckboxField name="isAgreed" label="Do you agree?"/>
      
      <div className="example-form_item_group">
        <RadioField name="rb2" label="Red" value="R" />
        <RadioField name="rb2" label="Green" value="G" />
        <RadioField name="rb2" label="Blue" value="B" />
      </div>
    
    <button onClick={props.form.handleSubmit}>
      Send
    </button>
    <div>
      <pre>
        Error Count: {props.form.getFormState().formStatus.errorCount}
        <br/>
        Field Values: 
        {JSON.stringify(props.form.getFormState().fieldValues, undefined, 2)}
      </pre>
    </div>
  </form>  
);

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearFormValues(form) {
  form.updateFields({});
}

export default formkit({
  connect,
  name: 'exampleF',
  initialValues: {rb2: 'G'},
  onSubmit: submitValues,
  onSubmitSuccess: clearFormValues
})(ExampleForm);
