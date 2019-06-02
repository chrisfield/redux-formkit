# User Interface Components


## Field - the only built-in ui-component

`Field` can be used directly on a Form like the examples on this page. 

First name is similar to the one in "Getting Started" but with validation. The middle and last name fields show alternative ways `Field` can be used: a render prop and a child render function.

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
        <label>Middle name: 
          <Field name="middleName" validate={required} render= {
            ({handleChange, handleBlur, value, touched, error}) => (
              <>
                <input onChange={handleChange} onBlur={handleBlur} value={value}/>
                {(touched && error)? <p>Error: {error}</p>: null}
              </>
            )
          }/>
        </label>
      </div>
      <div>
        <label>Last name: 
          <Field name="lastName" validate={required}>
            {({handleChange, handleBlur, value, touched, error}) => (
              <>
                <input onChange={handleChange} onBlur={handleBlur} value={value}/>
                {(touched && error)? <p>Error: {error}</p>: null}
              </>
            )}
          </Field>
        </label>
      </div>
    </TheForm>
  );
};
```
---
#### Component prop render
The firstName `Field` renders the component ("input" in the above example). It will add an onChange event to the input that will call validate.

`required` returns an error message if the value is missing.

`ErrorMessage` renders an error if the Field is touched.


#### Render prop
The middleName `Field` has a render function that will be called from field and passed useful props.


#### Child function render
The lastName `Field` has child function that will be called from field and passed useful props.


#### Next steps
You have seen that `Field` can be used directly on a Form in the UI components section you can see how it can be used to build other ui-components.
