# redux-formkit

[![NPM Version](https://img.shields.io/npm/v/redux-formkit.svg?style=flat)](https://www.npmjs.com/package/redux-formkit)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-formkit.svg?style=flat)](https://npmcharts.com/compare/redux-formkit?minimal=true)

Connect form inputs to Redux or standard React state. Includes validation, field-arrays, current valid/not-valid status, asynchronous submission and isomorphic features for frameworks like [nextjs](https://nextjs.org/).

## Motivation
Redux-Formkit aims to provide simular functionality to the excellent [Redux-form](https://github.com/erikras/redux-form) but with a really tightly scoped API allowing a smaller codebase (over 80% smaller). Eg it provides an api for connecting components but has no built in knowledge of checkboxes etc.


## Features
- Isomophic support (see paragraph below and Next-js example).
- Easy to migrate from/to redux-form
- Small bundle size
- Stores values as semantic types, eg number fields will store numbers
- Format values, eg to put commas in numbers
- Not cluttered with ui components or ad-hoc code
- Uses Context Api (introduced in from React 16.3)
- Use it with or without Redux and switch anytime by changing one import. 
- Field-arrays for repeated rows with add/remove
- Keeps a running error-count and valid/not valid status
- Synchronous validation including flexible support for inter-field valiation
- Asynchronous validation


## Client and Server Side Rendering
Users with a slow internet connection who use a server-rendered-form as soon as it arrives but before the javascript downloads would unfortunately see their changes overwritten when the javascript initiates and sets the controlled input values to match the redux-state. One way to counter this would be to initially disable the form inputs.

The Redux-formkit provides an alternative solution. The Field component includes code to update the redux-state using any data entered. In this way your form renders quickly, standard html elements are immediately usable, data is not lost and validation, formatting etc kick in as soon as the Javascript is available. 

To see this in action run the [nextjs example](https://github.com/chrisfield/redux-formkit/tree/master/examples/nextjs) and in the chrome dev-tools network tab choose the slow-3g option. While the javascript is downloading you will be able to use the server rendered html-form.

It is also great for clientside JS.


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
import formkit, {Field} from 'redux-formkit';

const ExampleForm = (props) => (
  <form className="example-form">
      <InputField
        name="theNumber"
        label="Numeric Field"
        formatToStore={number}
        formatFromStore={addCommas}
        validate={requiredNum}
      />

      <InputField
        name="capitals"
        label="Uppercase Field"
        formatToStore={upper}
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
  </form>  
);

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearFormValues(form) {
  form.updateFields({});
}


export default formkit({
  name: 'exampleF',
  initialValues: {rb2: 'G'},
  onSubmit: submitValues,
  onSubmitSuccess: clearFormValues
})(ExampleForm);


/*
  The following functions would normally be imported from separate 
  files and reused across a project 
*/
const upper = str => str.toUpperCase();
const number = str => parseInt(str.replace(/[^\d.-]/g, ""), 10);

const addCommas = number => {
  if (number === 0) {
    return '0';
  }
  if (!number) {
    return '';
  }
  return number.toLocaleString();
};

const requiredNum = value => {
  if (value === null || isNaN(value)) {
    return 'required';
  }
  return undefined;
};


const Input = props => (
  <div className="example-form_item">
    <label htmlFor={props.name} className="example-form_field-label">
      {props.label}
    </label>
    <input 
      id={props.name} 
      ref={props.setElementRef}
      type={props.type? props.type: 'text'} 
      placeholder={props.placeholder} 
      value={props.value} 
      onChange={props.handleChange} 
      onBlur={props.handleBlur}/>
    {props.error && props.touched && <p>{props.error}</p>}
  </div>
);

const InputField = props => (
  <Field component={Input} {...props} />
);

const isChecked = target => target.checked;

const Checkbox = props => (
  <div className="example-form_item">
    <label htmlFor={props.name}>{props.label}</label>
    <input id={props.name} 
     type="checkbox" 
     checked={props.value} 
     onChange={props.handleChange}
    />
  </div>
);

const CheckboxField = props => (
  <Field component={Checkbox} getTargetValue={isChecked} {...props} />
);

const RadioButton = props => {
  const id = `${props.name}-${props.radioValue}`;
  return (
     <div className="example-form_item">
      <label htmlFor={id}>{props.label}</label>
      <input id={id} 
        type="radio"
        name={props.name}
        value={props.radioValue}
        onChange={props.handleChange}
        checked={props.value===props.radioValue}
      />
    </div>
  );
}

const RadioField = props => (
  <Field 
    name={props.name} 
    component={RadioButton}
    label={props.label}
    radioValue={props.value}
  />
);

```


## Feedback / contributing
I'm keen to get feedback please let me know about any issues [here](https://github.com/chrisfield/redux-formkit/issues/new)


## API

### Formkit

`Formkit` is the higher order component used to wrap forms. You give it a config object and it returns a function to wrap a form. eg `Formkit({name:'sign-up'})(SignUp)` would wrap the SignUp form giving it extra facilities. It also gives it one extra prop called `form`.


The config object can contain:

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

* `getTargetValue : optional function` — provide a function to get the value. It will be called with the event as a parameter.

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
