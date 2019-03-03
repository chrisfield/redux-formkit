import React from 'react';
import {
  Form,
  FieldArray,
  NamedValidationStatus,
  SubmissionError,
  useFormReducer,
  useForm
} from '../redux-formkit';
import {InputField, RadioField, CheckboxField} from './form-controls';
import {upper, lower, number, addCommas, maxLength, requiredStr, requiredNum,
  getNextCursorPositionNum, getNextCursorPosition, setCursorPosition} from './form-controls/utils';

import './ExampleForm.css';


const ExampleForm = (props) => (
  <Form
    name="exampleF"
    initialValues={initialValues}
    onSubmit={submitAsynchronous}
    onSubmitSuccess={clearFormValues}
  >
    <fieldset>
      <legend className="example-form_title">
        Example form
      </legend>
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
        afterUpdate={revalidateField2}
        validate={requiredMaxLength5}
      />

      <InputField label="2nd Field > 1st field" name="field2" validate={greaterThanField1}/>
      <div className="example-form_item_group">
        <CheckboxField name="isAgreed" label="Can the server have a number bigger than 42?" onChange={revalidateTheNumber}/>
        <CheckboxField name="isAdditionalField" label="Is Additional Field?"/>
        {  
          /*props.form.getState().fieldValues.isAdditionalField 
          &&*/ <AdditionalField/>
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
        beforeUpdate={getNextCursorPositionNum}
        afterUpdate={setCursorPosition}

      />
      <InputField
        name="capitals"
        label="Uppercase Field"
        formatFromStore={upper}
        formatToStore={lower}
        beforeUpdate={getNextCursorPosition}
        afterUpdate={setCursorPosition}
    />
    </fieldset>
    
    <FieldArray
      name="hobbies"
      component={renderHobbies}
    />
    <div className="example-form_item">
            <button>
              Send
            </button>
    </div>
  </Form>  
);

const AdditionalField = () => {
  const { fieldValues } = useFormReducer(useForm().name)[0];
  if (!fieldValues.isAdditionalField) {
    return null;
  }
  return (
    <InputField 
      name="additionalField"
      validate={requiredStr}
      placeholder="Additional field"
    />
  );
};


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
  form.updateFields({theNumber: 1999});
}


const initialValues = {
  hobbies: [
    {description: 'stamp collecting'}
  ],
  theNumber: 42,
  isAgreed: true,
  rb2: 'G'
};


export default ExampleForm;


const revalidateField2 = field => {
  console.log('In revalidateField2 ');
  field.form.getField('field2').validate();
};

const revalidateTheNumber = field => {
  field.form.getField('theNumber').validate();
};

const maxLength5 = maxLength(5);
const requiredMaxLength5 = [requiredStr, maxLength5];