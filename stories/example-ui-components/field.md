# User Interface Components


## Field

The example below is similar to the one in "Getting Started" but has been extended to include validation. 

<!-- STORY -->

```
import React from 'react';
import TheForm from '../the-form';
import {Field, useField} from 'redux-formkit';

const required = value => (
  value && value.trim && value.trim().length > 0 ? undefined: 'Please enter a value'
);

const ErrorMessage = ({name}) => {
  const field = useField(name);
  return (field.touched && field.error)? <p>Error: {field.error}</p>: null;
};

const MyForm = () => {  
  return (
    <TheForm>
      <div>
        <label>First name: <Field name="firstName" component="input" validate={required}/></label>
        <ErrorMessage name="firstName"/>
      </div>
      <div>
        <label>Last name: <Field name="lastName" component="input" validate={required}/></label>
        <ErrorMessage name="lastName"/>
      </div>
    </TheForm>
  );
};

export MyForm;
```
---
#### Explanation
`Field` renders the component ("input" in the above example). It will add an onChange event to the input that will call validate.

`required` returns an error message if the value is missing.

`ErrorMessage` renders an error if the Field is touched.


#### Next Steps
You may well want ui-components that conviniently combine inputs, labels and error messages. These are not provided by the framework but they are easy to write. Several examples are shown in the remainder of this section. 