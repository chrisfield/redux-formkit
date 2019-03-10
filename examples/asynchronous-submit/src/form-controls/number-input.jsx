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

const NumberInput = ({required, validate, ...props}) => {
  const combinedValidate = required ? combineValidation(requiredNum, validate): validate;
  return <Field
    component={NumberInputComponent}
    validate={combinedValidate}
    formatFromStore={addCommas}
    formatToStore={number}
    beforeUpdate={getNextCursorPosition}
    afterUpdate={setCursorPosition}
    {...props}
  />
};

export default NumberInput;
