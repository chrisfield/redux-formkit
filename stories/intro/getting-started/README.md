# Intro

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
import {TextField} from './components/form-controls';

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
    <button onClick={props.form.handleSubmit}>
      Send
    </button>
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

`Redux-formkit` hooks up event listeners like `onChange` and `onBlur` to keep track of ui changes and it ties in with the react lifecycle methods like componentDidMount and componentDidUpdate to track the status of every field as and when changes are made.

`Redux-formkit` gives you control over where you store the state. The example above does not use Redux - it is storing the form data in standard React state. So you can use `Redux-formkit` without installing Redux. If later you decide to use Redux install both Redux and react-redux and amend the code to replace:
```import {connectWithoutRedux as connect} from 'redux-formkit'``` with 
```import {connect}  from react-redux```.

`Redux-formkit` is a framework written for developers. Rather than second guessing what UI components will be popular it provides an api for you to write the UI components that suit you. This keeps the download size low and makes `Redux-formkit` equally suitable for or web react-native deployments.
<br/>