import { withDocs } from 'storybook-readme';
import readme from './README.md'

import React from 'react';
import formkit, {connectWithoutRedux as connect} from '../../../packages/redux-formkit';
import {SelectField} from '../../form-controls';

const ExampleForm = (props) => (
  <form style={{textAlign: 'left', display: 'flex', flexWrap: 'wrap'}}>
    <div style={{display: 'flex'}}>
      <div style={{flex: 1, marginRight: '2rem'}}>

      <SelectField
          multiple
          name="niceColors"
          label="Nice Colors"
          afterUpdate={handleNiceColorsChange}
        >
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </SelectField>
        <SelectField
          name="favorateColor"
          label="Favorate Color"
          validate={validateFavorateColor}
        >
          <option key={""} value="">Select...</option>
          { props.form.getFormState().fieldValues.niceColors &&
            props.form.getFormState().fieldValues.niceColors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </SelectField>
        <button onClick={props.form.handleSubmit}>
          Send
        </button>
      </div>
      <div>
        <p>Error Count: {props.form.getFormState().formStatus.errorCount}</p>
        <p>niceColors: {JSON.stringify(props.form.getFormState().fieldValues.niceColors)}</p>
        <p>fieldStatus.niceColours: {JSON.stringify(props.form.getFormState().fieldStatus.niceColors)}</p>
        <p>favorateColor: {props.form.getFormState().fieldValues.favorateColor}</p>
        <p>fieldStatus.favorateColour: {JSON.stringify(props.form.getFormState().fieldStatus.favorateColor)}</p>
      </div>
    </div>
  </form>  
);

const validateFavorateColor = (value, values) => {
  if (!value
    || values.niceColors.filter(niceColor => (niceColor === value)).length === 0) 
  {
    return 'Please select a color';
  }
}

const handleNiceColorsChange = field => {
  field.form.getField('favorateColor').validate()
}

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearFormValues(form) {
  form.updateFields({niceColors:[]});
}

const FormkitForm = formkit({
  connect,
  name: 'exampleF',
  initialValues: {niceColors:[]},
  onSubmit: submitValues,
  onSubmitSuccess: clearFormValues
})(ExampleForm);

export default withDocs(readme, () => <FormkitForm/>);
