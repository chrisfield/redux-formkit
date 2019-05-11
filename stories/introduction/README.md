# Overview

## Getting Started

```
npm install --save redux-formkit
```
---

Enter values and see the changes to the state. The source code is below the running form.

<!-- STORY -->

```jsx
import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer} from 'redux-formkit';
import {TextInput, NumberInput, Checkbox, RadioButton} from '../form-controls';

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
          <TextInput name="fieldOne" required/>
          <NumberInput name="age"/>
          <Checkbox name="isAgreed" label="Do you agree?"/>
        </div>
        <div>"
          <RadioButton name="rb2" label="Red" value="R" />
          <RadioButton name="rb2" label="Green" value="G" />
          <RadioButton name="rb2" label="Blue" value="B" />
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

### Redux-formkit Concepts

`redux-formkit` has been designed to make it easy to change where state is stored. The example above it is storing the form data in standard `react` state. So, yes by default `redux-formkit` does not need `redux`. If later you decide to use `redux` simply install `redux-formkit-redux-state-provider` and use it instead of the <FormStateProvider>.

Field validation runs whenever a field mounts or updates. This opens up possibilites for the UI to do things such as place ticks next to valid inputs or make the submit button green when there are no errors.

Although any field errors are always available from the state the UI would not normally want to show a field error until the field has been touched.

The UI components are imported from a local folder. This is because `redux-formkit` does not include it's own UI components, instead it provides an api and several example UI components. This approach has several advantages:
- The download size is low
- Works well for both web and react-native deployments
- It keeps the api small
- Above all it gives you full control over your UI

Take a look at the Take a look at the [examples](https://github.com/chrisfield/redux-formkit/tree/master/examples) to see how easy it is to write UI components.
<br/>