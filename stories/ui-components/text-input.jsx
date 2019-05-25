import React from 'react';
import {Field} from '../../packages/redux-formkit/src';
import InputWrapper from './input-wrapper.jsx';

const TextInputComponent = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  elementRef,
  touched,
  error,
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
  return value && value.trim && value.trim().length > 0 ? undefined: `Please enter a value for ${label.toLowerCase()}`
};

export const TextInput = ({required, ...props}) => {
  return <Field
    component={TextInputComponent}
    validate={required? requiredStr: undefined}
    {...props}
  />
}

export default TextInput;