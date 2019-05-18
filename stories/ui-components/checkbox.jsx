import React from 'react';
import {Field} from '../../packages/redux-formkit/src';

const isChecked = target => target.checked;

const CheckboxComponent = props => (
  <div>
    <label htmlFor={props.name}>{props.label}</label>
    <input id={props.name} ref={props.elementRef} type="checkbox" checked={props.value} onChange={props.handleChange}/>  
  </div>
);

const Checkbox = props => (
  <Field component={CheckboxComponent} getTargetValue={isChecked} {...props} />
);

export default Checkbox;