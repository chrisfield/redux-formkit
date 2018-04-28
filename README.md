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


## Usage

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


## API

### Formkit

`Formkit` is the higher order component used to wrap forms. You give it a config object and it returns a function to wrap a form. eg `Formkit({name:'sign-up'})(SignUp)` would wrap the SignUp form giving it extra facilities. It also gives it one extra prop called `form`.


The config object can contain:

* `name : required string` — the name of the form eg 'sign-up'

* `initialValues : optional object` — any default values eg {theNumber: 42, isAgreed: true} 

* `onSubmit : optional function` —  use this to submit the field-values which will be passed in as a parameter. It can make api calls syncronously or by returning a promise. It will only be called if the form fields are valid. An important point to make is that this function can throw exceptions that pass error messages back to the form. eg
```
  throw new SubmissionError({
    username: "This username has already been taken. Please try another."
  }); 
```

* `onSubmitSuccess : optional function` — use this to reset the form fields or show a feedback message etc. It will be passed the form instance as a parameter.


The form prop will contain:
* `handleSubmit: function` - call this to initiate form submission eg 
```
  <button onClick={props.form.handleSubmit}>Send</button>
```


* `updateFields: function` - call this to update field values (in the Redux store) eg
```
  function clearFormValues(form) {
    form.props.updateFields({});
  }


  export default Formkit({
    name: 'exampleF',
    onSubmitSuccess: clearFormValues
  })(ExampleForm);
```

* `getField: function` - call this to get a field instance eg
```
form.getField('confirmPassword').revalidate();
```

* `props.fieldValues: object` - this can be used to access field values like in the [complex form example](https://github.com/chrisfield/redux-formkit/blob/master/examples/complex/src/components/ExampleForm.js).


### Field
Field is api is very simular to the one in redux-form. There are a few ways to use it but typically you would define a custom component which can be simply used like this:
```
  <InputField
    name="username"
    label="Username"
    validate={required}
  />
```


An example of how you coud define InputField is:

```
const Input = props => (
   <div>
     <label htmlFor={props.name}>{props.label}</label>
     <input
       id={props.name}
       ref={props.elementRef}
       value={props.value}
       onChange={props.update}
       onBlur={props.validate}/>
     {props.error && props.touched && <p>{props.error}</p>}
   </div>
);

const InputField = props => (
  <Field component={Input} {...props} />
);
```

Field will make use of the following props (other props will be passed straight through to the rendered component):
* `name : required string` — the name of the field eg 'postcode'

* `component : optional string or function` — the component to render. Eg like `component="input"` will render an input html element and component={Input} will call Input to render the component defined above. If no component is passed-in the Field component will look to render a function-as-child component (An unlikely but possible use-case).

* `validate : optional function or array of functions` — Any validation functions will be called two parameters: First the formatted field value (eg will be numeric for number formatted fields); Second all the field-values (eg so it's easy to check one date is after another). Validation functions should return undefined if the validation passes or an error if the validation fails. The error will often be a string but it can be any object.

* `format : optional function` — use this to convert to event.target.value to whatever semantic value makes sense to store in redux. Eg `format={str => str.toUpperCase}` will store the number as uppercase. 

* `formatFromStore : optional function` — use this to convert the value in redux to the value is expected by the rendered component. Eg: `formatFromStore={addCommas}` where `addcommas` is:
```
const addCommas = number => {
  if (number === 0) {
    return '0';
  }
  if (!number) {
    return '';
  }
  return number.toLocaleString();
};

``` 

Field will pass these props to the rendered component:
* `form` Use to access other fields use form.getField('username'). 
* `update`
* `validate`
* `value`
* `error`
* `touched`


### ValidationBlock
This is simply a named container used to position form wide error messages as thrown by onSubmit functions



