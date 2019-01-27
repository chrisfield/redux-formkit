# redux-formkit

[![NPM Version](https://img.shields.io/npm/v/redux-formkit.svg?style=flat)](https://www.npmjs.com/package/redux-formkit)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-formkit.svg?style=flat)](https://npmcharts.com/compare/redux-formkit?minimal=true)

Connect form inputs to Redux or standard React state. Includes validation, field-arrays, current valid/not-valid status, asynchronous submission and isomorphic features for frameworks like [nextjs](https://nextjs.org/).


## Motivation
Redux-Formkit aims to provide simular functionality to the excellent [Redux-form](https://github.com/erikras/redux-form) but with a really tightly scoped API allowing a smaller codebase (about 25% of the size).


## Getting Started
Take a look at the [examples](https://github.com/chrisfield/redux-formkit/tree/master/examples).

To use it on you own project:
`npm install --save redux-formkit`


## Features
- Small bundle size ([see bundlephobia](https://bundlephobia.com/result?p=redux-formkit))
- React-native support ([see example](https://github.com/chrisfield/redux-formkit/tree/master/examples/reactnative))
- Isomophic support to enter values before js downloads ([see example](https://github.com/chrisfield/redux-formkit/tree/master/examples/nextjs))
- Universal validation. Define rules once: use on client, use on server ([see example](https://github.com/chrisfield/redux-formkit/tree/master/examples/servervalidation))
- Use it with or without Redux and switch anytime by changing one import ([see example](https://github.com/chrisfield/redux-formkit/tree/master/examples/withoutredux))
- Easy to migrate from/to redux-form
- Stores values as semantic types, eg number fields will store numbers
- Format values, eg to put commas in numbers
- Not cluttered with ui components or ad-hoc code
- Field-arrays for repeated rows with add/remove
- Keeps a running error-count and valid/not valid status
- Synchronous validation including flexible support for inter-field valiation
- Asynchronous validation


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


Then write your forms like in the [Simple example](https://github.com/chrisfield/redux-formkit/tree/master/examples/simple):

```javascript
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
      Error Count: {props.form.getFormState().formStatus.errorCount}
      <pre>
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

```

## Feedback / contributing
I'm keen to get feedback please let me know about any issues [here](https://github.com/chrisfield/redux-formkit/issues/new)


## API

### Formkit

`formkit` is the higher order component used to wrap forms. You give it a config object and it returns a function to wrap a form. eg `formkit({connect, name:'sign-up'})(SignUp)` would wrap the SignUp form giving it extra facilities. It also gives it one extra prop called `form`.


The config object can contain:

* `connect : required function` — Use the import { connect } from 'react-redux' or use import { connectWithoutRedux } from 'redux-formkit'

* `name : required string` — the name of the form eg 'sign-up'

* `initialValues : optional object` — this is one way to set field values. 

* `onSubmit : optional function` —  use this to submit the field-values which will be passed in as a parameter. It can make api calls syncronously or by returning a promise. It will only be called if the form fields are valid. An important point to make is that this function can throw exceptions that pass error messages back to the form. eg
```
  throw new SubmissionError({
    username: "This username has already been taken. Please try another."
  }); 
```

* `onSubmitSuccess : optional function` — use this to reset the form fields or show a feedback message etc. It will be passed the form instance as a parameter.


The form prop passed to your form will contain:
* `handleSubmit: function` - call this to initiate form submission eg 
```
  <button onClick={props.form.handleSubmit}>Send</button>
```


* `getFormState: function` - call this to get the form state
```
props.form.getFormState().fieldValues.isAdditionalField
```


* `updateFields: function` - call this to update field values (in the Redux store) eg
```
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

```

* `getField: function` - call this to get a field instance eg
```
form.getField('confirmPassword').validate();
```
The field interface object that is returned only has one method: validate.


### Field
Field is api is very simular to the one in redux-form. There are a few ways to use it but typically you would define a custom component:
```
const Input = props => (
   <div>
     <label htmlFor={props.name}>{props.label}</label>
     <input
       id={props.name}
       ref={props.setElementRef}
       value={props.value}
       onChange={props.handleChange}
       onBlur={props.handleBlur}/>
     {props.error && props.touched && <p>{props.error}</p>}
   </div>
);

const InputField = props => (
  <Field component={Input} {...props} />
);
```

and use it on the form:
```
  <InputField
    name="username"
    label="Username"
    validate={required}
  />
```


Field will make use of the following props (other props will be passed straight through to the rendered component):
* `name : required string` — the name of the field eg 'postcode'

* `component : required string or function` — the component to render. Eg like `component="input"` will render an input html element and component={Input} will call Input to render the component defined above. 

* `validate : optional function or array of functions` — Any validation functions will be called two parameters: First the formatted field value (eg will be numeric for number formatted fields); Second all the field-values (eg so it's easy to check one date is after another). Validation functions should return undefined if the validation passes or an error if the validation fails. The error will often be a string but it can be any object.

* `formatToStore : optional function` — use this to convert the event.target.value to whatever semantic value makes sense to store in redux. Eg `format={str => str.toUpperCase}` will store the number as uppercase. 

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

* `getNextCursorPosition : optional function` — provide a function to preserve the cursor position when formatFromStore is used. It will be called with parameters: previousPosition, previousValue, newValue and should return the next cursor position.

* `getTargetValue : optional function` — provide a function to get the value. It will be called with the target and event as a parameters.

* `useTargetCondition : optional function` — Only relevant for isomorphic forms. Will be called onComponentMount with the elementRef as a parameter.  If it returns true the value of the element will be used to update the store. See it used on the radio-buttons in the next-js example.


Field will pass these props to the rendered component:
* `handleChange` function to call onChange
* `handleBlur` function to call onBlur
* `value` value formatted from the store
* `error` string or object. Will be undefined for a valid field 
* `touched` boolen
* `setElementRef` function that can be pass this an the ref prop

### updateFieldsAction
`updateFieldsAction(formName, values)` returns an action object ready to dispatch to Redux. Dispatching this will reinitialize the form updating all form fields with the values provided and setting them all as untouched.

### updateFieldAction
`updateFieldAction(formName, fieldName, value)` returns an action object ready to dispatch to Redux. Dispatching this will update one field leaving the others unchanged.

### NamedValidationStatus
This is simply a named container used to position error messages. It can be used to render field error messages separately from the field and also for form wide error messages as thrown by the onSubmit function.
