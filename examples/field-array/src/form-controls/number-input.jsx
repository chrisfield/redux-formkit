import React, {useEffect, useRef} from 'react';
import {Field, usePrevious} from 'redux-formkit';
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


const NumberInput = ({required, ...props}) => {
  return <Field
    component={NumberInputComponent}
    validate={required? requiredNum: undefined}
    formatFromStore={addCommas}
    formatToStore={number}
    {...props}
  />
};

export default NumberInput;
