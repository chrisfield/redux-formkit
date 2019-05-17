# Getting Started

Redux-formkit is a lightweight, simple, and efficient solution for creating basic to complex forms in react. Use it to get and set field values, to validate and format fields, to create custom inputs and to keep track of the error count so you always know whether the form fields are all valid.

Out of the box it uses standard React state via it's FormStateProvider but it's easy to change from/to Redux using [ReduxFormkitReduxStateProvider](https://www.npmjs.com/package/redux-formkit-redux-state-provider).

Version 3 was written from scratch to use Hooks. Check out the [Github repo](https://github.com/chrisfield/redux-formkit).


##### Install with npm or yarn
`npm install --save redux-formkit` or `yarn add redux-formkit`

## Try out this simple form

Go ahead and play around with the form below then take a look at the code snippet and explanation.

<!-- STORY -->

---
#### Code
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

#### Explanation
`FormStateProvider` links `Form` components to React state. To switch to using Redux simply `import FormStateProvider from "redux-formkit-redux-state-provider"`

`Form` uses an `onSubmit` function to mark the fields as touched, to check if the form is valid and, if it is, to call your `submitValues` function passing in the form values from state.

`Field` uses `onChange`, `onBlur` functions to maintain the field value in state. It renders the *component* ("input" in the above example) passing in the state.

`useForm` is a hook you can use to access the `Form`. The example above simply uses it to get the form name (to avoid hardcoding "myForm" again).

`useFormReducer` is a hook that takes a form-name as a parameter and returns state and dispatch in a two element array. The returned array is like the one that would be returned from the standard [React useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) hook. This simularity is no accident because, when you are not using redux, useFormReducer just passes the work on to useReducer.

#### Next Steps
The example above renders an `input` because `Field` was given the property `component="input"`. In the next section you can learn how to use `Field` to write your own ui-components.
