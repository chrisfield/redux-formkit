# redux-formkit

[![NPM Version](https://img.shields.io/npm/v/redux-formkit.svg?style=flat)](https://www.npmjs.com/package/redux-formkit)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-formkit.svg?style=flat)](https://npmcharts.com/compare/redux-formkit?minimal=true)

Connect form inputs to Redux or standard React state. Includes validation, field-arrays, current valid/not-valid status and asynchronous submission.

## Motivation
Redux-Formkit aims to provide simular functionality to the excellent [Redux-form](https://github.com/erikras/redux-form) but with a really tightly scoped API allowing a smaller codebase. Eg it provides an api for connecting components but has no built in knowledge of checkboxes etc.

## Server Side Rendering
An isomorphic form with controlled inputs can be rendered on a server and arrive in the browser ready to use. With a slower internet connection the user could enter serveral values in standard html input fields before the javascript downloads and normally this data would be overwritten when the javascript sets controlled input values from the initial state. 

The Redux-formkit Field component includes code to update the state with any data entered. In this way your form renders quickly, standard html elements are immediately usable, data is not lost and validation, formatting etc kick in as soon as the Javascript is available.

Being light weight it is also good for clientside JS/

## Other Features
- Redux is optional: no need to install it if you import {formkitWithoutRedux}
- Not cluttered with ui components
- Simple to use API
- Easy to migrate from/to redux-form
- Uses Context Api (introduced in from React 16.3)
- Field-arrays for repeated rows with add/remove
- Nested FieldArrays in case a repeated row has child repeating rows.
- Form error-count/valid-status is easy to access, eg to put a tick next to the submit button
- Synchronous validation including flexible support for inter-field valiation
- Asynchronous validation
- Stores values as semantic types, eg number fields will store numbers
- Format values, eg to put commas in numbers
- Sets cursor focus at start
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
import formkit, {Field} from 'redux-formkit';
//import {formkitWithoutRedux as formkit, Field} from 'redux-formkit';

const ExampleForm = (props) => (
  <form className="example-form">
    <fieldset>
      <Field
        label="First Field"
        name="field1"
        component={Input}
        validate={[requiredStr, maxLength5]}
      />

                                {/* Or you can define component that 
                                    renders the Field */}
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

    </fieldset>
    
    <button
      type="button"
      onClick={props.form.handleSubmit} 
    >
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

const maxLength5 = (value, values) => (
  value && value.trim && value.trim().length > 5 ? 'maxLength': undefined
);


const requiredStr = value => (
  value && value.trim && value.trim().length > 0 ? undefined: 'required'
);

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
      ref={props.elementRef}
      type={props.type? props.type: 'text'} 
      placeholder={props.placeholder} 
      value={props.value} 
      onChange={props.handleChange} 
      onBlur={props.handleBlur}/>
    {props.error && props.touched && <p>{props.error}</p>}
  </div>
);

const isChecked = target => target.checked;

const InputField = props => (
  <Field component={Input} {...props} />
);

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


The form prop will contain:
* `handleSubmit: function` - call this to initiate form submission eg 
```
  <button onClick={props.form.handleSubmit}>Send</button>
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
       ref={props.elementRef}
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

* `component : optional string or function` — the component to render. Eg like `component="input"` will render an input html element and component={Input} will call Input to render the component defined above. If no component is passed-in the Field component will look to render a function-as-child component (An unlikely but possible use-case).

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

Field will pass these props to the rendered component:
* `handleChange`
* `handleBlur`
* `value`
* `error`
* `touched`

### updateFieldsAction
`updateFieldsAction(formName, values)` is the function to return an action object ready to dispatch to Redux.

### NamedValidationStatus
This is simply a named container used to position form wide error messages as thrown by onSubmit functions



