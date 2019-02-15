import React from 'react';
import {Field} from '../../packages/redux-formkit';
import {number, addCommas, getNextCursorPositionNum, setCursorPosition} from './utils';

const Input = props => (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <label style={{flex: '0 0 100%'}} htmlFor={props.name}>{props.label}</label>
      <input
         ref={props.setElementRef}
         id={props.name} 
         type={props.type? props.type: 'text'} 
         placeholder={props.placeholder} 
         value={props.value} 
         onChange={props.handleChange} 
         onBlur={props.handleBlur}
      />
      {props.children}
      {props.error && props.touched && <p className="error">{props.error}</p>}     
    </div>
  );
  
  const InputField = props => (
    <Field
      component={Input}
      formatToStore={number}
      formatFromStore={addCommas}
      beforeUpdate={getNextCursorPositionNum}
      afterUpdate={setCursorPosition}      
      {...props}
      />
  );

  export default InputField;