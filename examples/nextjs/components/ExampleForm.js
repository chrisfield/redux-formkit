import React from 'react';
import PropTypes from 'prop-types';
import formkit, {Field, FieldArray, FormStatus, NamedValidationStatus, SubmissionError} from 'redux-formkit';


const ExampleForm = (props) => (
  <form className="example-form">
    <fieldset>
      <legend className="example-form_title">
        Example form
      </legend>
      <FormStatus>
        {({isValid, isSubmitting, errorCount}) => {
          return(
            <div className="example-form_status">
              Form is {isValid? '': 'not yet '}valid. Error count: {errorCount}. Submitting: {isSubmitting + ''}
            </div>
          )
        }}
      </FormStatus>
      <NamedValidationStatus name="formErrorAtTop" >
        {({error}) => {
          if (error) {
            return <p>{error}</p>
          };
          return null;
        }}
      </NamedValidationStatus>
      <InputField
        label="First Field"
        name="field1"
        onChange={revalidateField2}
        validate={requiredMaxLength5}
      />

      <InputField label="2nd Field > 1st field" name="field2" validate={greaterThanField1}/>
      <div className="example-form_item_group">
        <CheckboxField name="isAgreed" label="Can the server have a number bigger than 42?" onChange={revalidateTheNumber}/>
        <CheckboxField name="isAdditionalField" label="Is Additional Field?"/>
        {  
         props.form.getFormState().fieldValues.isAdditionalField 
          && <Field component={InputField} name="additionalField" validate={requiredStr} placeholder="Additional field"/>
        }
      </div>
      
      <div className="example-form_item_group">
        <RadioField name="rb2" label="Red" value="R"/>
        <RadioField name="rb2" label="Green" value="G"/>
        <RadioField name="rb2" label="Blue" value="B"/>
      </div>
      <InputField
        name="theNumber"
        label="Numeric Field"
        formatToStore={number}
        formatFromStore={addCommas}
        validate={requiredNum}
      />
      <InputField
        name="capitals"
        label="Uppercase Field"
        formatFromStore={upper}
        formatToStore={lower}
        getNextCursorPosition={getNextCursorPosition}
      />
    </fieldset>
    
    <FieldArray
      name="hobbies"
      component={renderHobbies}
    />
    <div className="example-form_item">
      <FormStatus>
        {({isSubmitting, isValid}) => {
          return(
            <button
              type="button"
              onClick={props.form.handleSubmit} 
              className={`example-form_button ${isValid? 'example-form_button-valid': ''}`}
              disabled={isSubmitting}
            >
              Send
            </button>
          )
        }}
      </FormStatus>
    </div>
  </form>  
);


const renderHobbies = ({form, fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Hobbies
    </legend>
    {fields.map((hobby, index) => (
      <div key={hobby}>
        <InputField
          key={hobby}
          name={`${hobby}.description`}
          validate={requiredStr}
          label={`Hobby #${index + 1}`}
        >
          <button type="button" title="Remove Hobby" onClick={() => fields.remove(index)}>-</button>
        </InputField>
      </div>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Hobby</button>
  </fieldset>
);

const greaterThanField1 = (value, values) => (
  values && value > values.field1? undefined: 'greaterThanField1'
);

const getNextCursorPosition = (prevPosition, previousValue, nextValue) => (
  prevPosition
);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submitAsynchronous(values) {
  return sleep(1000).then(() => {                    // Simulate latency
    if (!values.isAgreed && values.theNumber > 42) { // Simulate serverside validation
      throw new SubmissionError({
        theNumber: "You didn't agree to numbers greater than 42!!",
        formErrorAtTop: "Form not processed. Please make changes and try again."
      });
    }
    window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
  });
}

function clearFormValues(form) {
  form.updateFields({theNumber: 1999, rb2: 'B'});
}


const initialValues = {
  hobbies: [
    {description: 'stamp collecting'}
  ],
  field1: 'def',
  theNumber: 42,
  isAgreed: true,
  rb2: 'G'
};


export default formkit({
  name: 'exampleF',
  initialValues: undefined, //initialValues,
  onSubmit: submitAsynchronous,
  onSubmitSuccess: clearFormValues
})(ExampleForm);


const revalidateField2 = form => {
  form.getField('field2').validate();
}

const revalidateTheNumber = form => {
  form.getField('theNumber').validate();
}

/*
  The following functions would normally be imported from separate files 
  and reused across a project 
*/
const upper = value => ((value && value.toUpperCase())||'');
const lower = value => ((value && value.toLowerCase())||'');
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

const isChecked = target => target.checked;

const maxLength5 = (value, values) => (
  value && value.trim && value.trim().length > 5 ? 'maxLength': undefined
);


const requiredStr = value => {
  return value && value.trim && value.trim().length > 0 ? undefined: 'required'
};

const requiredMaxLength5 = [requiredStr, maxLength5];

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
       ref={props.setElementRef}
       id={props.name} 
       type={props.type? props.type: 'text'} 
       placeholder={props.placeholder} 
       value={props.value} 
       onChange={props.handleChange} 
       onBlur={props.handleBlur}/>
     {props.children}
     {props.error && props.touched && <p>{props.error}</p>}
   </div>
);

const InputField = props => (
  <Field component={Input} {...props} />
);

const Checkbox = props => (
  <div className="example-form_item">
    <label htmlFor={props.name}>{props.label}</label>
    <input id={props.name} ref={props.setElementRef} type="checkbox" checked={props.value} onChange={props.handleChange}/>
  </div>
);

const getRadioValue = (target) => (
  target.checked? target.value: prevValue
);

const RadioButton = props => {
  const id = `${props.name}-${props.radioValue}`;
  return (
     <div className="example-form_item">
      <label htmlFor={id}>{props.label}</label>
      <input id={id} type="radio" ref={props.setElementRef} name={props.name} value={props.radioValue} checked={props.radioValue===props.value} onChange={props.handleChange}/>
    </div>
  );
};

const CheckboxField = props => (
  <Field component={Checkbox} getTargetValue={isChecked} {...props} />
);

const RadioField = props => (
  <Field name={props.name} radioValue={props.value} useTargetCondition={isChecked} getTargetValue={getRadioValue} component={RadioButton} label={props.label}/>
);

ExampleForm.propTypes = {
  form: PropTypes.object.isRequired
}

