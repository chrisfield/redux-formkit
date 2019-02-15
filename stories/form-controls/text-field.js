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
      {props.children}
      {props.error && props.touched && <div style={{flex: '0 0 100%'}}>{props.error}</div>}     
    </div>
  );
  
  const InputField = ({validate, ...props}) => {
    const validation = props.required ? [requiredStr] : [];
    if (validate) {
      validation.push(validate);
    }
    return <Field component={Input} validate={validation} {...props} />;
  };

  export default InputField;