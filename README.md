# redux-formkit

[![NPM Version](https://img.shields.io/npm/v/redux-formkit.svg?style=flat)](https://www.npmjs.com/package/redux-formkit)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-formkit.svg?style=flat)](https://npmcharts.com/compare/redux-formkit?minimal=true)

Light-weight React components making it easy to write html forms connected to the Redux store. Includes validation, field-arrays, current valid/not-valid status and asynchronous submission.

## Motivation
Redux-Formkit aims to provide simular functionality to the excellent [Redux-form](https://github.com/erikras/redux-form) but with a slightly lower level API implemented with a much smaller codebase.

## Features
- Lightweight and fast
- Mimimal by design, leaves you in control
- Not cluttered with ui components
- Simple to use API
- Easy to migrate from/to redux-form
- Now uses the new Context Api (from React 16.3) 
- Field-arrays for repeated rows with add/remove
- Nested FieldArrays in case a repeated row has child repeating rows.
- Form error-count/valid-status is easy to access, eg to put a tick next to the submit button
- Synchronous validation including flexible support for inter-field valiation
- Asynchronous validation
- Stores redux values as semantic types, eg number fields will store numbers
- Format values, eg to put commas in numbers
- Sets cursor focus at start and after sumbit validation
- Works with NextJS. Values quickly entered into SSR fields are used when the client JS loads. 


## Getting Started
Take a look at the [examples](https://github.com/chrisfield/redux-formkit/tree/master/examples).

To use it on you own project:
`npm install --save redux-formkit`


## The Gist
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
  The following functions would normally be imported from separate files 
  and reused across a project 
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

