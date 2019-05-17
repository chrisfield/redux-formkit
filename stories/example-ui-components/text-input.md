# Example User Interface Components

#### Approach to defining UI components
Typically form frameworks provide a set of built-in UI components (Checkbox, Select etc) and/or they include UI specific logic such as `if (type === "checkbox") {/* do checkbox stuff */}`. While this approach does make it easy for form developers to get started it also makes for a larger codebase and it can seem like the built-in components are special priviledged cases (particularly if they make use of internal features or by-pass any api).

`redux formkit` uses an alternative approach: It provides just one UI component - `Field` together with an api that aims to make it easy enough for form developers to define the exact UI components they require. This approach keeps the framework lightweight and form developers use the same api that any example UI components will have used.


## Field

The `Field` component renders a UI component and connects it to the state.

You may have already seen a simple example of a `Field` being included directly in a Form in the 'Getting Started' section: `<Field name="firstName" component="input"/>`. Now you will see how `Field` can be used to define your own UI components.

The code snippet below defines a custom component that could be use like this `<TextInput name="firstName" label="First Name" required/>`:

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

