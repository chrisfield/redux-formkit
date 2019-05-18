# Example User Interface Components


## Example TextInput

The code snippet below defines a ui-component that could be use like this `<TextInput name="firstName" label="First Name" required/>`:

<!-- STORY -->

```
import React from 'react';
import {Field} from 'redux-formkit';

const InputWrapper = ({label, name, touched, error, children}) => (
  <div>
    <label htmlFor={name}>{label || name}</label>
    {children}
    {touched && error && <p>{error}</p>}
  </div>
);

const TextInputComponent = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  elementRef,
  touched,
  error,
  children,
  ...props}) => 
(
    <InputWrapper {...{name, label, touched, error}}>
      <input
        id={name}
        ref={elementRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    </InputWrapper>
);

const requiredStr = (value, _values, {label}) => {
  return value && value.trim && value.trim().length > 0 ? 
    undefined: `Please enter a value for ${label.toLowerCase()}`
};

export const TextInput = ({required, ...props}) => {
  return <Field
    component={TextInputComponent}
    validate={required? requiredStr: undefined}
    {...props}
  />
}
```
---
#### Explanation
`TextInput` renders a `Field`. If it is a required `TextInput` the `Field` will be given `requiredStr` as the `validate` prop.

`requiredStr` `Field` will call validate functions when onChange events or onSubmit events fire. Validate functions are called with three params:
- `value: any`: the latest field value
- `values: object`: all the fieldValues. Use this to validate one field against another
- `fieldInterface: object`: Use this to get additional context about the `Field`. In this example the `label` is used in the form error message.

`TextInputComponent` is the component the `Field` will render. It renders a standard html input inside an `InputWrapper`.

`input` is a standard html component. The value is passed as a prop from the state. Functions to update the state are are passed as onChange and onBlur props. The `ref=elementRef` props allows `redux-formkit` to set the cursor focus when an error occurs during submit validation.

`InputWrappper` renders its children (the input) with a label and an error message. Note that the errorMessage will only render if the `Field` is `touched`.

