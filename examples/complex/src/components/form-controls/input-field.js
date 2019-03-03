import React from 'react';
import {Field} from 'redux-formkit';

const Input = props => (
    <div className="example-form_item">
      <label htmlFor={props.name}>{props.label}</label>
      <input
         ref={props.setElementRef}
         id={props.name} 
         type={props.type? props.type: 'text'} 
         placeholder={props.placeholder} 
         value={props.value} 
         onChange={props.handleChange} 
         onBlur={props.handleBlur}
      />
      <p>
        Touched: {props.touched + ''}
      </p><p>
      Error: {props.error + ''}
      </p>
      {props.children}
      {props.error && props.touched && <p className="error">{props.error}</p>}     
    </div>
  );
  
  const InputField = props => (
    <Field component={Input} {...props} />
  );

  export default InputField;