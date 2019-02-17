import React from 'react';
import {Field} from '../../packages/redux-formkit';

const getTargetValue = target => {
  const options = Array.from(target.options);
  return options.filter(option=>(option.selected)).map(option=>(option.value));
}

const Select = props => (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <label style={{flex: '0 0 100%'}} htmlFor={props.name}>{props.label}</label>
      <select
        multiple={props.multiple}
        style={{flex: '0 0 100%'}}
        ref={props.setElementRef}
        id={props.name} 
        type={props.type? props.type: 'text'} 
        value={props.value}
        onChange={props.handleChange} 
        onBlur={props.handleBlur}
      >
        {props.children}
      </select>
      {props.error && props.touched && <div style={{flex: '0 0 100%'}}>{props.error}</div>}     
    </div>
  );
  
  const SelectField = props => {
    return <Field getTargetValue={props.multiple ? getTargetValue : undefined} component={Select} {...props} />;
  };

  export default SelectField;