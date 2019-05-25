# User Interface Components


## Example NumberInput

The example below uses `Field` to implement a numeric field: 
``` jsx
<NumberInput name="salary" label="Salary" required/>
``` 


<!-- STORY -->

```
import React from 'react';

const InputWrapper = ({label, name, touched, error, children}) => (
  <div>
    <label htmlFor={name}>{label || name}</label>
    {children}
    {touched && error && <p>{error}</p>}
  </div>
);

export default InputWrapper;
```

```jsx
import React from 'react';
import {Field} from 'redux-formkit';
import InputWrapper from './input-wrapper.jsx';

const NumberInputComponent = ({
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
{
  return (
    <InputWrapper {...{name, label, touched, error}}>
      <input
        id={name}
        ref={elementRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
      {children}
    </InputWrapper>
  );
};

const requiredNum = (value, _values, field) => {
  if (value === null || isNaN(value)) {
    return `Please enter a value for ${field.label.toLowerCase()}`;
  }
  return undefined;
};

const number = str => {
  const num = parseInt(str.replace(/[^\d.-]/g, ""), 10);
  if (num === null) {
    return undefined;
  }
  return num;
};

const addCommas = number => {
  if (number === 0) {
    return '0';
  }
  if (!number) {
    return '';
  }
  return number.toLocaleString();
};


export const getNextCursorPosition = ({element}, value, nextValue) => {
  let cursorPosition = element.selectionStart;
  if (nextValue.length === value.length + 2) { // + 2 is for digit and comma
    cursorPosition++;
  }
  return cursorPosition;
}

export const setCursorPosition = ({element}, cursorPosition) => {
  if (cursorPosition !== undefined && element.setSelectionRange) {
    element.setSelectionRange(cursorPosition, cursorPosition);
  }  
}

const NumberInput = ({required, ...props}) => {
  return <Field
    component={NumberInputComponent}
    validate={required? requiredNum: undefined}
    formatFromStore={addCommas}
    formatToStore={number}
    beforeUpdate={getNextCursorPosition}
    afterUpdate={setCursorPosition}
    {...props}
  />
};

export default NumberInput;
```
---
#### Explanation
`TextInput` renders a `Field`. If it is a required `TextInput` the `Field` will be given `requiredStr` as the `validate` prop.

`requiredStr` returns an error message if the value is missing.

`TextInputComponent` is the component the `Field` will render. It renders a standard html input inside an `InputWrapper`.

`input` is a standard html component. The value is passed as a prop from the state. Functions to update the state are are passed as onChange and onBlur props. The `ref=elementRef` props allows `redux-formkit` to set the cursor focus when an error occurs during submit validation.

`InputWrappper` renders its children (the input) with a label and an error message. Note that the errorMessage will only render if the `Field` is `touched`.

