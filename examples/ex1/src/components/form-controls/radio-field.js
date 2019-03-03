import React from 'react';
import {Field} from '../../redux-formkit';

const isChecked = target => target.checked;
  
const RadioButton = props => {
  const id = `${props.name}-${props.radioValue}`;
  return (
    <div className="example-form_item">
      <input id={id} type="radio" ref={props.setElementRef} name={props.name} value={props.radioValue} checked={props.radioValue===props.value} onChange={props.handleChange}/>
      <label htmlFor={id}>{props.label}</label>
    </div>
  );
};

const RadioField = props => (
  <Field name={props.name} radioValue={props.value} useTargetCondition={isChecked} component={RadioButton} label={props.label}/>
);

export default RadioField;