import React from 'react';
import {Formkit, Field} from 'redux-formkit';

import './ExampleForm.css';


const ExampleForm = (props) => (
  <form className="example-form">
    <fieldset>
                                {/* You can use Field directly*/}
      <Field
        label="First Field"
        name="field1"
        component={Input}
        validate={[requiredStr, maxLength5]}
      />

                                {/* Or you can define component that renders the Field */}
      <InputField
        name="theNumber"
        label="Numeric Field"
        format={number}
        formatFromStore={addCommas}
        validate={requiredNum}
      />

      <InputField
        name="capitals"
        label="Uppercase Field"
        format={upper}
      />


      <CheckboxField name="isAgreed" label="Do you agree?"/>
      
      <div className="example-form_item_group">
        <RadioField name="rb2" label="Red" value="R" />
        <RadioField name="rb2" label="Green" value="G" />
        <RadioField name="rb2" label="Blue" value="B" />
      </div>

    </fieldset>
    
    <button
      type="button"
      onClick={props.form.handleSubmit} 
      className="example-form_button"
    >
      Send
    </button>
            
  </form>  
);


function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearFormValues(form) {
  form.props.updateFields({});
}


export default Formkit({
  name: 'exampleF',
  onSubmit: submitValues,
  onSubmitSuccess: clearFormValues
})(ExampleForm);



/*
  The following functions would normally be imported from separate files and reused across a project 
*/
const upper = str => str.toUpperCase();
const number = str => parseInt(str.replace(/[^\d.-]/g, ""), 10);

const addCommas = number => {
  if (number === 0) {
    return '0';
  }
  if (!number) {
    return '';
  }
  return number.toLocaleString();
};

const maxLength5 = (value, values) => (
  value && value.trim && value.trim().length > 5 ? 'maxLength': undefined
);


const requiredStr = value => {
  return value && value.trim && value.trim().length > 0 ? undefined: 'required'
};

const requiredNum = value => {
  if (value === null || isNaN(value)) {
    return 'required';
  }
  return undefined;
};


const Input = props => (
   <div className="example-form_item">
     <label htmlFor={props.name} className="example-form_field-label">{props.label}</label>
     <input 
       id={props.name} 
       ref={props.elementRef}
       type={props.type? props.type: 'text'} 
       placeholder={props.placeholder} 
       value={props.value} 
       onChange={props.update} 
       onBlur={props.validate}/>
     {props.error && props.touched && <p>{props.error}</p>}
   </div>
);

const InputField = props => (
  <Field component={Input} {...props} />
);

const Checkbox = props => (
  <div className="example-form_item">
    <label htmlFor={props.name}>{props.label}</label>
    <input id={props.name} type="checkbox" checked={props.value} onChange={props.update}/>
  </div>
);

const RadioButton = props => {
  const id = `${props.name}-${props.radioValue}`;
  return (
     <div className="example-form_item">
      <label htmlFor={id}>{props.label}</label>
      <input id={id} type="radio" value={props.radioValue} checked={props.radioValue===props.value} onChange={props.update}/>
    </div>
  );
};

const CheckboxField = props => (
  <Field component={Checkbox} {...props} />
);

const RadioField = props => (
  <Field name={props.name} radioValue={props.value} component={RadioButton} label={props.label} />
);

