# Overview

## Getting Started

##### Install with npm

```
npm install --save redux-formkit
```

Take a look at the [GitHub](https://github.com/chrisfield/redux-formkit) repo.

---

#### Try it out
Enter values in the field on the left and see the changes to the state shown on the right. Then have a look at the code snippet read about some key `redux-formkit` concepts.

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

### Redux-formkit Concepts

`redux-formkit` has been designed from day one to allow you to control where the state is stored. The example above it is storing the form data in standard `react` state. So you can use `redux-formkit` without installing `redux`! If later you decide to use `redux` simply `npm install redux react-redux --save` and amend the code to replace:
- ```import {connectWithoutRedux as connect} from 'redux-formkit'```
- with ```import {connect}  from react-redux```.

Field validation runs whenever a field mounts or updates. This opens up possibilites for the UI to do things such as place ticks next to valid inputs or make the submit button green when there are no errors.

Although any field erros are always available from the state the UI would not normally want to show a field error until the field has been touched.

Did you notice that `TextField` is imported from a local folder? `redux-formkit` does not include it's own UI components, instead it provides an api and several example UI components. This approach has several advantages:
- Developers have full control over the UI
- The download size is low
- Works well for both web and react-native deployments

There is more information about the implementation details of example UI components in the UI components section. It will be useful to look at this if you want to write new UI components.
<br/>