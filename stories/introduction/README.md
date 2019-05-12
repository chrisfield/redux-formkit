# Intro

Redux-formkit is a lightwieight, simple, and efficient solution for creating basic to complex forms in react. Use it to get and set field values, to validate and format fields, to create custom inputs and to keep track of the error count so you always know whether the form fields are all valid.

Out of the box it uses standard React state via it's FormStateProvider but it's easy to change from/to Redux using [ReduxFormkitReduxStateProvider](https://www.npmjs.com/package/redux-formkit-redux-state-provider).

Version 3 was written from scratch to use Hooks. Checkout our [Github](https://github.com/chrisfield/redux-formkit).

## Getting Started

##### Install with npm
```
npm install --save redux-formkit
```

##### Have some fun

Go ahead and play around with the form below then take a look at the code snippet: that's all you need to get started.
<!-- STORY -->

```jsx
import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer, Field} from 'redux-formkit';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div>
          <label>First name: <Field name="firstName" component="input"/></label>
        </div>
        <button>Submit</button>
        <div>
          <label>Values:</label>
            <TheFormState/> 
        </div>        
      </Form>
    </FormStateProvider>
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

---

##### Explanation
`Redux-formkit FormStateProvider` links `Form` components to React state. To switch to using Redux simply `import FormStateProvider from "redux-formkit-redux-state-provider"`

`Redux-formkit Form` uses an `onSubmit` function to mark the fields as touched, to check if the form is valid and, if it is, to call your `submitValues` function passing in the form values from state.

`Redux-formkit Field` uses `onChange`, `onBlur` functions to maintain the field value in state. It renders the *component* ("input" in the above example) passing in the state.

`Redux-formkit useForm` is a hook you can use to access the `Form`. The example above simply uses it to get the form name (to avoid hardcoding "myForm" again).

`Redux-formkit useFormReducer` is a hook that takes a form-name as a parameter and returns state and dispatch in a two element array. The returned array is like the one that would be returned from the standard [React useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) hook. This simularity is no accident because, when you are not using redux, useFormReducer just passes the work on to useReducer.


##### UI Compoments
Most form framworks either provide a set of built-in UI components (Checkbox, Select etc) or they add UI specific logic such as `if (type === "checkbox") {/* do checkbox stuff */}`. These approaches make it easy for form developers to get started but there are a couple of downsides:
- In catering for many built-in UI components the frameworks get heavy.
- Custom components can seem to be 'special cases' that are hard to write particularly if the built-in UI components by-pass any api.

`redux formkit` takes a different approach: it provides one UI component - `Field` together with an api that aims to make it easy enough to define any UI component. This has many advantages including:
- It keeps the framework light weight.
- Form developers can build exactly the UI components they want using the same api that was used with standard html form controls.

To get stated developers might want to copy some UI components from the examples (Checkbox, Select etc).


## API

### Form

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
Field is used to render a UI component and connect it to it's state. There are a few ways to use it but typically you would define a custom component:
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