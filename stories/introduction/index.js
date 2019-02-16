import { withDocs } from 'storybook-readme';
import readme from './README.md'

import React from 'react';
import formkit, {connectWithoutRedux as connect} from '../../packages/redux-formkit';
import {TextField} from '../form-controls';

const minLength5 = value => (
  value.length < 5
    ? 'Field must be at least five characters'
    : undefined
);

const ExampleForm = (props) => (
  <form style={{textAlign: 'left', display: 'flex', flexWrap: 'wrap'}}>
    <div style={{display: 'flex'}}>
      <div style={{flex: 1, marginRight: '2rem'}}>

        <TextField
          name="firstName"
          label="First Name"
          required
          validate={minLength5}
        />
        <button onClick={props.form.handleSubmit}>
          Send
        </button>
      </div>
      <div>
        <p>First Name: {props.form.getFormState().fieldValues.firstName}</p>
        <p>Error Count: {props.form.getFormState().formStatus.errorCount}</p>
        <p>fieldStatus.firstName: {JSON.stringify(props.form.getFormState().fieldStatus.firstName)}</p>
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

const FormkitForm = formkit({
  connect,
  name: 'exampleF',
  onSubmit: submitValues,
  onSubmitSuccess: clearFormValues
})(ExampleForm);

export default withDocs(readme, () => <FormkitForm/>);
