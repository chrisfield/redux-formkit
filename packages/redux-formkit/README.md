# redux-formkit

[![NPM Version](https://img.shields.io/npm/v/redux-formkit.svg?style=flat)](https://www.npmjs.com/package/redux-formkit)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-formkit.svg?style=flat)](https://npmcharts.com/compare/redux-formkit?minimal=true)

Connect form inputs to standard React state. Optionally use Redux. Includes validation, field-arrays, current valid/not-valid status, asynchronous submission and isomorphic features for frameworks like [nextjs](https://nextjs.org/).


## Motivation
Redux-Formkit aims to provide simular functionality to the excellent [Redux-form](https://github.com/erikras/redux-form) but with a really tightly scoped API allowing a smaller codebase (about 25% of the size). Version 3 is influenced by [Informed](https://www.npmjs.com/package/informed), it is written with hooks and by default it does not use Redux.


## Getting Started

### Go to [live examples, code and docs](https://chrisfield.github.io/redux-formkit/).

Checkout [the examples](https://github.com/chrisfield/redux-formkit/tree/master/examples)

To use it on you own project:
`npm install --save redux-formkit`


## Features
- Small bundle size ([see bundlephobia](https://bundlephobia.com/result?p=redux-formkit))
- React-native support
- Simple to use with next js ([See example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-next))
- Isomophic support to enter values before js downloads ([See example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-next-and-redux))
- Use without Redux and switch anytime by installing [`redux-formkit-redux-state-provider`](https://www.npmjs.com/package/redux-formkit-redux-state-provider) ([See example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-redux))
- Easy to migrate from/to redux-form
- Stores values as semantic types, eg number fields will store numbers
- Format values, eg to put commas in numbers
- Not cluttered with ui components or ad-hoc code
- Field-arrays for repeated rows with add/remove
- Keeps a running error-count and valid/not valid status
- Synchronous validation including flexible support for inter-field valiation
- Asynchronous submit validation [See example](https://github.com/chrisfield/redux-formkit/tree/master/examples/asynchronous-submit)

I need to update the react-native example for version 3 (hooks). The old examples are [here](https://github.com/chrisfield/redux-formkit/tree/before-hooks/examples).


## Usage
Add one or more instances of ```FormStateProvider```.  Forms and any other components under the FormStateProvider can access the state with the ```useFormReducer``` hook.

```javascript
import {FormStateProvider} from "redux-formkit";
import MyForm from './my-form.jsx';

const FormContainer = () => {
  return (
    <FormStateProvider>
      <MyForm/>
    </FormStateProvider>
  );
};
```


Then write your forms like in the [Simple example](https://github.com/chrisfield/redux-formkit/tree/master/examples/simple):

```javascript
import React from 'react';
import { Form } from 'redux-formkit';
import {TextInput, NumberInput, Checkbox, RadioButton} from './form-controls';

const MyForm = () => {  
  return (
    <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
      <div>
        <TextInput name="fieldOne" required/>
        <NumberInput name="age"/>
        <Checkbox name="isAgreed" label="Do you agree?"/>
      </div>
      <div>
        <RadioButton name="rb2" label="Red" value="R" />
        <RadioButton name="rb2" label="Green" value="G" />
        <RadioButton name="rb2" label="Blue" value="B" />
      </div>
      <button>Submit</button>
    </Form>
  );
};

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearValues(form) {
  form.updateFields({});
}

export default MyForm;
```

## Feedback / contributing
I'm keen to get feedback please let me know about any issues [here](https://github.com/chrisfield/redux-formkit/issues/new)


## API

### Formkit

`Form` is a component that will render a form and act as a container for Fields.

It accepts the following props:

* `name : required string` — the name of the form eg 'sign-up'

* `initialValues : optional object` — this is one way to set field values. 

* `onSubmit : optional function` —  use this to submit the field-values which will be passed in as a parameter. It can make api calls syncronously or by returning a promise. It will only be called if the form fields are valid. An important point to make is that this function can throw exceptions that pass error messages back to the form. eg
```
  throw new SubmissionError({
    username: "This username has already been taken. Please try another."
  }); 
```

* `onSubmitSuccess : optional function` — use this to reset the form fields or show a feedback message etc. It will be passed the form instance as a parameter.


### Field
Field is api is very simular to the one in redux-form. There are a few ways to use it but typically you would define a custom component:
```
const InputComponent = props => (
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

export const InputField = props => (
  <Field component={InputComponent} {...props} />
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

* `beforeUpdate : optional function` — provide a function that will return a custom value (any type) that you can then access after the field renders. The function will be passed the `fieldInterface`, value, nextValue as parameters. The value that your function returns will later be passed on to any afterUpdate function. A typical use for this function is to calculate and return the cursor-position before a field is formatted.

* `afterUpdate : optional function` — provide a function that will called after the field renders. Your function will be passed the `fieldInterface` and as a parameter. Typical uses for this function would be: to use a custom value eg to set the cursor-position or secondly to revalidate a second field when one field changes.

* `getTargetValue : optional function` — provide a function to get the value. It will be called with the target and event as a parameters.

* `useTargetCondition : optional function` — Only relevant for isomorphic forms. Will be called onComponentMount with the elementRef as a parameter.  If it returns true the value of the element will be used to update the store. See it used on the radio-buttons in the next-js example.

<a name="fieldInterface"></a>
The `fieldInterface` object (passed to beforeUpdate and afterUpdate) includes props: 
* `name` of this field
* `element` defined if you pass `ref={elementRef}` to the html element
* `value`
* `error`
* `touched`
* `customProps`
* `validate: function` no params taken
* `setTouched:` pass a boolean value
* `setValue`: pass the value

Field will pass these props to the rendered component:
* `handleChange` function to call onChange
* `handleBlur` function to call onBlur
* `value` value formatted from the store
* `error` string or object. Will be undefined for a valid field 
* `touched` boolen
* `elementRef` pass this an the ref prop

### hooks
`useFormReducer(formName)` like the familiar useReducer it returns state and dispatch as two elements in an array. This hook can be called from any component under the `FormStateProvider` (eg if the `FormStateProvider` is at the root of the component tree it can be called from all components).

`useForm()` returns an object that has one property `name`. It can be called from any components under a `Form`. I expect this to mostly be used together with `useFormReducer` to avoid hardcoding form names.

`useField(fieldName)` returns a <a href="#fieldInterface">`fieldInteface`</a> object. It can be called from any components under a `Form`.

### updateFieldsAction
`updateFieldsAction(values)` returns an action object ready to dispatch to a formReducer. Dispatching this will reinitialize the form updating all fields with the values provided and setting them all as untouched.

### updateFieldAction
`updateFieldAction(fieldName, value)` returns an action object ready to dispatch to a formReducer. Dispatching this will update one field leaving the others unchanged.