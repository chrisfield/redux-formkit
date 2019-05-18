# Simple Form

<!-- STORY -->

---
#### Code
```jsx
import React from 'react';
import {FormStateProvider, Form, useForm, useFormReducer} from 'redux-formkit';
import {TextInput, NumberInput, Checkbox, RadioButton} from '../ui-components';

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" initialValues={{rb2: 'G'}} onSubmit={submitValues} onSubmitSuccess={clearValues}>
        <div>
          <TextInput name="fieldOne" label="Field One" required/>
          <NumberInput name="age" label="Age"/>
          <Checkbox name="isAgreed" label="Do you agree?"/>
        </div>
        <div>
          <RadioButton name="rb2" label="Red" value="R" />
          <RadioButton name="rb2" label="Green" value="G" />
          <RadioButton name="rb2" label="Blue" value="B" />
        </div>
        <button>Submit</button>
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

#### Approach to defining UI components
Ui-components like `Checkbox`, `RadioButton`, `TextInput` and  `NumberInput` make it quick and easy to write your forms.

Form frameworks typically come with these built-in. Many also include component specific code like `if (type === "checkbox") {/* do checkbox stuff */}`

`redux formkit` takes an alternative approach: it provides just one ui-component - `Field` together with an api that aims to make it easy for you to define any other ones you want.

This makes for a smaller, cleaner codebase, it leaves you in control over your own ui-components and, with example ui-components, it is still quick and easy to get started.


#### Next Steps
Take a look at example ui-components. It is easy to copy or adapt these to meet your exact requirements. You can learn more about how ui-components are defined by looking at the `Field` api.
