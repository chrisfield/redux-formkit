# Overview

## Getting Started

##### Install with npm

```
npm install --save redux-formkit
```

Take a look at the [GitHub](https://github.com/chrisfield/redux-formkit) repo.

---

#### A One Field Form
Enter values in the field on the left and see the changes to the state shown on the right. Then have a look at the code snippet and the explanation.

<!-- STORY -->

```jsx
import React from 'react';
import formkit, {connectWithoutRedux as connect} from 'redux-formkit';
import {TextField} from '../form-controls'

const minLength5 = value => (
  value.length < 5
    ? 'Field must be at least five characters'
    : undefined
);

const ExampleForm = (props) => (
  <form>
    <TextField
      name="firstName"
      label="First Name"
      required
      validate={minLength5}
    />
    <button onClick={props.form.handleSubmit}>Send</button>
    <div>
      <p>First Name: {props.form.getFormState().fieldValues.firstName}</p>
      <p>Error Count: {props.form.getFormState().formStatus.errorCount}</p>
      <p>fieldStatus.firstName: {JSON.stringify(props.form.getFormState().fieldStatus.firstName)}</p>
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
  onSubmit: submitValues,
  onSubmitSuccess: clearFormValues
})(ExampleForm);
```

---

### Explanation

You won't be surprised that `redux-formkit` uses events like `onChange` and `onBlur` to propogate ui changes to values stored as state and that it uses React lifecycle methods like componentDidMount and componentDidUpdate to track the status of fields as and when changes are made.

You might be more surprised to learn that `redux-formkit` has been designed from day one to allow you to control where the state is stored and that the example above it is storing the form data in standard `react` state. So, yes, you can use `redux-formkit` without installing `redux`. If later you decide to use `redux` simply `npm install redux react-redux --save` and amend the code to replace:
```import {connectWithoutRedux as connect} from 'redux-formkit'``` with 
```import {connect}  from react-redux```.

Did you notice that `TextField` is imported from a local folder? This is because `redux-formkit` does not include it's own UI components, instead it provides an api and obviously several example UI components. This gives developers full control over their UI and has other advantages such as keeping the download size low and making `redux-formkit` suitable for both web react-native deployments.
<br/>