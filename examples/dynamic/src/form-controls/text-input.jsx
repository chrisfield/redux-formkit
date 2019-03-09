import React, {useRef} from 'react';
import {Field} from 'redux-formkit';
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


function combineValidation(validate1, validate2) {
  if (!validate1) {
    return validate2;
  }
  if (!validate2) {
    return validate1;
  }
  const v1Array = Array.isArray(validate1) ? validate1: [validate1];
  const v2Array = Array.isArray(validate2) ? validate2: [validate2];
  return v1Array.concat(v2Array);
}

export const TextInput = ({required, validate, ...props}) => {
  const combinedValidate = required ? combineValidation(requiredStr, validate): validate;
  return <Field
    component={TextInputComponent}
    validate={combinedValidate}
    {...props}
  />

// export const TextInput = ({required, ...props}) => {
//   return <Field
//     component={TextInputComponent}
//     validate={required? requiredStr: undefined}
//     {...props}
//   />
}

export default TextInput;