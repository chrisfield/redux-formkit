import React from 'react';
import {Field} from 'redux-formkit';

const isChecked = target => target.checked;
  
const RadioButtonComponent = props => {
  const id = `${props.name}-${props.radioValue}`;
  return (
    <div>
      <input id={id} type="radio" ref={props.setElementRef} name={props.name} value={props.radioValue} checked={props.radioValue===props.value} onChange={props.handleChange}/>
      <label htmlFor={id}>{props.label}</label>
    </div>
  );
};

const RadioButton = props => (
  <Field
    component={RadioButtonComponent}
    name={props.name}
    radioValue={props.value}
    useTargetCondition={isChecked}
    label={props.label}
  />
);

export default RadioButton;