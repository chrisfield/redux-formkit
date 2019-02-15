import React from 'react';
import formkit from '../../../packages/redux-formkit';
import {TextField, IntegerField, RadioField, CheckboxField} from '../../form-controls';
import { connect } from 'react-redux';

const ExampleForm = (props) => (
  <form style={{textAlign: 'left', display: 'flex', flexWrap: 'wrap'}}>
    <div style={{display: 'flex'}}>
      <div style={{flex: 1, marginRight: '2rem'}}>

        <TextField
          name="field1"
          label="Text Field"
          required
        />

        <IntegerField
          name="theNumber"
          label="Numeric Field"
        />

        <CheckboxField name="isAgreed" label="Do you agree?"/>
        
        <div style={{display: 'flex'}}>
          <label>Favorate colour:</label>
          <RadioField name="rb2" label="Red" value="R" />
          <RadioField name="rb2" label="Green" value="G" />
          <RadioField name="rb2" label="Blue" value="B" />
        </div>
      
        <button onClick={props.form.handleSubmit}>
          Send
        </button>
      </div>
      <div>
        <label>Values:</label>
        <pre>
          {JSON.stringify(props.form.getFormState().fieldValues, undefined, 2)}
        </pre>
        <p>Error Count: {props.form.getFormState().formStatus.errorCount}</p>
      </div>
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
