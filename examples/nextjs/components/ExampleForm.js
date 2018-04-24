import React from 'react';
import {Field, FieldArray, FormStatus, ValidationBlock, SubmissionError, Formkit} from 'redux-formkit';
import { connect } from 'react-redux';


const ExampleForm = (props) => (
  <form className="example-form"> {/*No need for this to be a form. It can be a div/section etc */}
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
          props.form.props.fieldValues.isAdditionalField 
          && <Field component="input" name="additionalField" placeholder="Additional field"/>
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
        format={number}
        formatFromStore={addCommas}
        validate={requiredNum}
      />
      <InputField
        name="capitals"
        label="Uppercase Field"
        format={upper}
      />
    </fieldset>
    
    <FieldArray
      name="hobbies"
      component={renderHobbies}
      hobbies={props.hobbies}
    />
    <FormErrorSection name="formError"/>
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


const renderHobbies = ({form, fields, hobbies}) => (
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
        <FieldArray
          name={`${hobby}.equipment`}
          component={renderEquipment}
          hobbyName={hobbies[index] && hobbies[index].description? hobbies[index].description: 'this Hobby'}
        />
        {/*Can add more fields here*/}
      </div>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Hobby</button>
  </fieldset>
);


const renderEquipment = ({form, fields, hobbyName}) => (
  <fieldset>
    <legend className="example-form_title">
      Equipment for {hobbyName}
    </legend>
    <button type="button" onClick={() => fields.push()}>Add Equipment</button>
    {fields.map((equipment, index) => (
      <InputField
        key={equipment}
        name={`${equipment}`}
        validate={requiredStr}
        label={`Equipment #${index + 1}`}
      >
        <button type="button" title="Remove Equipment" onClick={() => fields.remove(index)}>-</button>
      </InputField>
    ))}
  </fieldset>
);



const greaterThanField1 = (value, values) => (
  values && value > values.field1? undefined: 'greaterThanField1'
);

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submitAsynchronous(values) {
  return sleep(1000).then(() => {                    // Simulate latency
    if (!values.isAgreed && values.theNumber > 42) { // Simulate serverside validation
      throw new SubmissionError({
        theNumber: "You didn't agree to numbers greater than 42!!",
        formError: "Form not processed. Please make changes and try again."
      });
    }
    window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
  });
}

function clearFormValues(form) {
  form.props.updateFields({});
}


const initialValues = {
  hobbies: [
    {description: 'stamp collecting'}
  ],
  theNumber: 42,
  isAgreed: true,
  rb2: 'G'
};

const mapStateToProps = (state) => {
  return {
    hobbies: state.form.exampleF? state.form.exampleF.values.hobbies: []
  }
};


/* This connect is not being used by redux-formkit but is there to 
   show that you can connect to the store if you want */
export default connect(mapStateToProps)(Formkit({
  name: 'exampleF',
  initialValues: initialValues,
  onSubmit: submitAsynchronous,
  onSubmitSuccess: clearFormValues
})(ExampleForm));


const revalidateField2 = form => {
  const f2 = form.getField('field2');
  if (f2) {
    f2.revalidate()
  }
}
const revalidateTheNumber = form => {
  const n = form.getField('theNumber');
  if (n) {
    n.revalidate();
  }
}


/*
  The following functions would normally be imported from separate files 
  and reused across a project 
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

const requiredMaxLength5 = [requiredStr, maxLength5];

const requiredNum = value => {
  if (value === null || isNaN(value)) {
    return 'required';
  }
  return undefined;
};


const FormErrorSection = props => (
  <ValidationBlock {...props} >
    {({error}) => {
      if (error) {
        return <p>{error}</p>
      };
      return null;
    }}
  </ValidationBlock>
);

const Input = props => (
   <div className="example-form_item">
     <label htmlFor={props.name} className="example-form_field-label">{props.label}</label>
     <input
       ref={props.elementRef}
       id={props.name} 
       type={props.type? props.type: 'text'} 
       placeholder={props.placeholder} 
       value={props.value} 
       onChange={props.update} 
       onBlur={props.validate}/>
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
    <input id={props.name} ref={props.elementRef} type="checkbox" checked={props.value} onChange={props.update}/>
  </div>
);

const RadioButton = props => {
  const id = `${props.name}-${props.radioValue}`;
  return (
     <div className="example-form_item">
      <label htmlFor={id}>{props.label}</label>
      <input id={id} type="radio" name={props.name} ref={props.elementRef} value={props.radioValue} checked={props.radioValue===props.value} onChange={props.update}/>
    </div>
  );
};

const CheckboxField = props => (
  <Field component={Checkbox} {...props} />
);

const RadioField = props => (
  <Field name={props.name} radioValue={props.value} component={RadioButton} label={props.label}/>
);



