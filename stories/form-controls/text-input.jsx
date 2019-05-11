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
      {children}
    </InputWrapper>
);

const requiredStr = value => {
  return value && value.trim && value.trim().length > 0 ? undefined: 'Required Field'
};

export const TextInput = ({required, ...props}) => {
  return <Field
    component={TextInputComponent}
    validate={required? requiredStr: undefined}
    {...props}
  />
}

export default TextInput;