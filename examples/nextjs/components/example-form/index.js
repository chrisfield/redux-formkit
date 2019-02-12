import React from 'react';
import PropTypes from 'prop-types';
import formkit, {FieldArray, FormStatus, NamedValidationStatus, SubmissionError, Field} from 'redux-formkit';
import {InputField, RadioField, CheckboxField} from '../form-controls';
import {upper, lower, number, addCommas, maxLength, requiredStr, requiredNum,
  getNextCursorPositionNum, getNextCursorPosition, setCursorPosition} from '../form-controls/utils';
import WithClientJsOnly from '../with-client-js-only';
import { connect } from 'react-redux';

const ExampleForm = (props) => {
  return (
    <form className="exampleForm">
      <fieldset>
        <legend>
          Example form
        </legend>
        <WithClientJsOnly>
          <FormStatus>
            {({isValid, isSubmitting, errorCount}) => {
              return(
                <div className="example-form_status">
                  Form is {isValid? '': 'not yet '}valid. Error count: {errorCount}. Submitting: {isSubmitting + ''}
                </div>
              )
            }}
          </FormStatus>
        </WithClientJsOnly>
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

        <InputField
          label="2nd Field > 1st field"
          name="field2" 
          validate={greaterThanField1}
        />

        <label htmlFor="basic-field">Basic Input Field :</label>
        <Field id="basic-field" component="input" name="abc" />

        <InputField
          name="theNumber"
          label="Numeric Field"
          formatToStore={number}
          formatFromStore={addCommas}
          validate={requiredNum}
          beforeUpdate={getNextCursorPositionNum}
          afterUpdate={setCursorPosition}
        />

        <CheckboxField name="isAgreed" label="Can the server have a number bigger than 42?" afterUpdate={revalidateTheNumber}/>

        <CheckboxField name="isAdditionalField" label="Is Additional Field?"/>
        {  
        props.form.getFormState().fieldValues.isAdditionalField 
          && <InputField name="additionalField" validate={requiredStr} placeholder="Additional field"/>
        }
        
        <div>
          <fieldset>
            <legend>Favorate color</legend>
            <div className="radioButtons">
              <RadioField name="rb2" label="Red" value="R"/>
              <RadioField name="rb2" label="Green" value="G"/>
              <RadioField name="rb2" label="Blue" value="B"/>
            </div>
          </fieldset>
        </div>

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
      <FormStatus>
        {({isSubmitting, isValid}) => {
          return(
            <button
              type="button"
              onClick={props.form.handleSubmit} 
              className={`submitButton ${isValid? 'submitButton-valid': ''}`}
              disabled={isSubmitting}
            >
              Send
            </button>
          )
        }}
      </FormStatus>
      <style jsx>{`
        .exampleForm {
          max-width: 400px;
          margin: auto;
        }
        .radioButtons {
          display: flex;
          justify-content: space-around;
        }
        .submitButton {
          width: 100%;
          padding: 10px;
        }
        .submitButton-valid {
          background-color: green;
        }
      `}
      </style>
    </form>  
  );
}


const renderHobbies = ({form, fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Hobbies
    </legend>
    {fields.map((hobby, index) => (
      <InputField
        key={hobby}
        name={`${hobby}.description`}
        validate={requiredStr}
        label={`Hobby #${index + 1}`}
      >
        <button type="button" title="Remove Hobby" onClick={() => fields.remove(index)}>-</button>
    </InputField>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Hobby</button>
    <style jsx>{`
      .hobby {
        display: flex;
      }
      .hobbyInputField {
        flex-basis: 90%;
      }
      .hobbyRemove {
        align-self: center;
      }
    `}
    </style>
  </fieldset>
);

const greaterThanField1 = (value, values) => (
  values && value > values.field1? undefined: 'Field two must be greater than field one'
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

export default formkit({
  connect,
  name: 'exampleF',
  onSubmit: submitAsynchronous,
  onSubmitSuccess: clearFormValues
})(ExampleForm);


const revalidateField2 = field => {
  field.form.getField('field2').validate();
};

const revalidateTheNumber = field => {
  field.form.getField('theNumber').validate();
};

const maxLength5 = maxLength(5);
const requiredMaxLength5 = [requiredStr, maxLength5];

ExampleForm.propTypes = {
  form: PropTypes.object.isRequired
}

