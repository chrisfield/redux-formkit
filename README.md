# redux-formkit

[![NPM Version](https://img.shields.io/npm/v/redux-formkit.svg?style=flat)](https://www.npmjs.com/package/redux-formkit)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-formkit.svg?style=flat)](https://npmcharts.com/compare/redux-formkit?minimal=true)

Light-weight React components making it easy to write html forms connected to the Redux store. Includes validation, field-arrays, current valid/not-valid status and asynchronous submission. 


## Getting Started
Clone, run and edit the [redux-formkit examples](https://github.com/chrisfield/formapp) to try it out.

To use it on you own project:
`npm install --save redux-formkit`


Add formReducer to your own reducer
```javascript
import { formReducer } from 'redux-formkit';

export const initialState = {};

const rootReducer = (state = initialState, action) => (
  {
    form: formReducer(state.form, action)
  }
);

export default rootReducer;
```


Then write your form
```javascript
import React from 'react';
import {Formkit, Field} from 'redux-formkit';

import './ExampleForm.css';


const ExampleForm = (props) => (
  <form className="example-form">
    <Field
      label="First Field"
      name="field1"
      form={props.form}
      component={Input}
      validate={required}
    />

    <button
      type="button"
      onClick={props.form.handleSubmit} 
      className="example-form_button"
    >
      Send
    </button>
            
  </form>
);


function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearFormValues(form) {
  form.props.updateFields({});
}


export default Formkit({
  name: 'exampleF',
  onSubmit: submitValues,
  onSubmitSuccess: clearFormValues
})(ExampleForm);



/*
  The following functions would normally be imported from separate files and reused across a project 
*/
const required = value => {
  return value && value.trim && value.trim().length > 0 ? undefined: 'required'
};

const Input = props => (
  <div className="example-form_item">
    <label htmlFor={props.name} className="example-form_field-label">{props.label}</label>
    <input 
      id={props.name} 
      type={props.type? props.type: 'text'} 
      placeholder={props.placeholder} 
      value={props.value} 
      onChange={props.update} 
      onBlur={props.validate}/>
    {props.error && props.touched && <p>{props.error}</p>}
  </div>
);
```

## Features
- Lightweight and fast
- Mimimal by design, leaves you in control
- Not cluttered with ui components
- Simple to use API
- Field-arrays for repeated rows with add/remove
- Nested FieldArrays in case a repeated row has child repeatring rows.
- Form error-count/valid-status is easy to access, eg to put a tick next to the submit button
- Synchronous validation including flexible support for inter-field valiation
- Asynchronous validation
- Stores redux values as semantic types, eg number fields will store numbers
- Format values, eg to put commas in numbers

