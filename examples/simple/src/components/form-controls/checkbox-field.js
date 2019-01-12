import React from 'react';
import {Field} from 'redux-formkit';

const isChecked = target => target.checked;

const Checkbox = props => (
  <div className="example-form_item">
    <label htmlFor={props.name}>{props.label}</label>
    <input id={props.name} ref={props.setElementRef} type="checkbox" checked={props.value} onChange={props.handleChange}/>  
  </div>
);

const CheckboxField = props => (
  <Field component={Checkbox} getTargetValue={isChecked} {...props} />
);

export default CheckboxField;