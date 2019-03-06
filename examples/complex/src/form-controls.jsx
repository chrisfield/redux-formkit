import React, {useEffect, useRef} from 'react';
import {Field, usePrevious} from 'redux-formkit';

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
  const cursorPosRef = useRef();
  const handleChange2 = event => {cursorPosRef.current = elementRef.current.selectionStart; handleChange(event)};
  const previous = usePrevious({value, pos: elementRef.current?  elementRef.current.selectionStart: null})
  useEffect(() => {
    if (previous) {
      let cursorPos = cursorPosRef.current;
      if (value.length === previous.value.length + 2) { // + 2 is for digit and comma
        cursorPos += 1;
      }
      elementRef.current.setSelectionRange(cursorPos, cursorPos);
    }
  });
  return (
      <InputWrapper {...{name, label, touched, error}}>
        <input
          id={name}
          ref={elementRef}
          value={value}
          onChange={handleChange2}
          onBlur={handleBlur}
          {...props}
        />
        {children}
      </InputWrapper>
  );
};

const InputWrapper = ({label, name, touched, error, children}) => (
  <div>
    <label htmlFor={name}>{label || name}</label>
    {children}
    {touched && error && <p>{error}</p>}
  </div>
);

const requiredStr = value => {
  return value && value.trim && value.trim().length > 0 ? undefined: 'Required Field'
};

const requiredNum = value => {
  if (value === null || isNaN(value)) {
    return 'required';
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

export const TextInput = ({required, ...props}) => {
  return <Field
    component={TextInputComponent}
    validate={required? requiredStr: undefined}
    {...props}
  />
}

export const NumberInput = ({required, ...props}) => {
  return <Field
    component={NumberInputComponent}
    validate={required? requiredNum: undefined}
    formatFromStore={addCommas}
    formatToStore={number}
    {...props}
  />
}