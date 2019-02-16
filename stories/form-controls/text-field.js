import React from 'react';
import {Field} from '../../packages/redux-formkit';
import {requiredStr} from './utils';


const Input = props => (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <label style={{flex: '0 0 100%'}} htmlFor={props.name}>{props.label}</label>
      <input
         style={{flex: '0 0 100%'}}
         ref={props.setElementRef}
         id={props.name} 
         type={props.type? props.type: 'text'} 
         placeholder={props.placeholder} 
         value={props.value} 
         onChange={props.handleChange} 
         onBlur={props.handleBlur}
      />
      {props.error && props.touched && <div style={{flex: '0 0 100%'}}>{props.error}</div>}     
    </div>
  );
  
  const TextField = ({validate = [], ...props}) => {
    const validation = Array.isArray(validate) ? validate.slice() : [validate];
    if (props.required) {
      validation.unshift(requiredStr);
    }
    return <Field component={Input} validate={validation} {...props} />;
  };

  export default TextField;