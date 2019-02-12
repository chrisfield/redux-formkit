import React from 'react';
import PropTypes from 'prop-types';
import formkit, {FieldArray, FormStatus, NamedValidationStatus, SubmissionError, Field} from 'redux-formkit';
import {InputField, RadioField, CheckboxField} from '../form-controls';
import {upper, lower, number, addCommas, maxLength, requiredStr, requiredNum,
  getNextCursorPositionNum, getNextCursorPosition, setCursorPosition} from '../form-controls/utils';
import WithClientJsOnly from '../with-client-js-only';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import {createFormDataHandler, getFieldDefinitionsByName} from '../form-data-handler';

const maxLength5 = maxLength(5);
const requiredMaxLength5 = [requiredStr, maxLength5];
const greaterThanField1 = (value, values) => (
  values && value > values.field1? undefined: 'Field two must be greater than field one'
);

const checkboxChecked = value => !!value;

const definedFieldsForDataHandler = [
  {
    name: 'field1',
    validate: requiredMaxLength5
  },
  {
    name: 'theNumber',
    formatToStore: number,
    formatFromStore: addCommas,
    validate: requiredNum
  },
  {
    name: 'field2',
    validate: greaterThanField1
  },
  {name: 'abc'},
  {
    name: 'isAgreed',
    formatToStore: checkboxChecked
  },
  {
    name: 'isAdditionalField',
    formatToStore: checkboxChecked
  },
  {
    name: 'additionalField',
    validate: (value, values) => values.isAdditionalField && requiredStr(value)
  },
  {
    name: 'rb2',
    validate: value => (value === 'R' || value ==='G' || value === 'B') ? undefined : 'RGB only'
  },
  {
    name: 'capitals',
    formatToStore: upper,
    formatFromStore: lower,
    validate: requiredStr
  },
  {
    name: 'hobbies',
    fieldArray: [
      {
        name: 'name',
        validate: requiredStr
      },
      {
        name: 'description'
      }
    ]
  }
];

const formValidation = values => (!values.isAgreed && values.theNumber > 42) ?  
{theNumber: 'You didn`t agree to numbers > 42'} : {};


export const formDataHandler = createFormDataHandler(definedFieldsForDataHandler, formValidation);
const fieldDefinitions = getFieldDefinitionsByName(definedFieldsForDataHandler); 

const ExampleForm = (props) => {
  return (
    <form className="exampleForm" method="POST" action="/exampleF">
      <fieldset>
        <legend>
          Example form.
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
          {...fieldDefinitions.field1}
          label="First Field"
          onChange={revalidateField2}
        />

        <InputField
          {...fieldDefinitions.field2}
          label="2nd Field > 1st field"
        />

        <label htmlFor="basic-field">Basic Input Field :</label>
        <Field id="basic-field" component="input" name="abc" />

        <InputField
          {...fieldDefinitions.theNumber}
          validate={requiredNum} /* So the "greater that 42" validation only runs on the server */
          label="Numeric Field"
          beforeUpdate={getNextCursorPositionNum}
          afterUpdate={setCursorPosition}
        />

        <CheckboxField
          {...fieldDefinitions.isAgreed}
          label="Can the server have a number bigger than 42?"
          onChange={revalidateTheNumber}
        />

        <CheckboxField
          {...fieldDefinitions.isAdditionalField}
          label="Is Additional Field?"
        />
        {  
          props.form.getFormState().fieldValues.isAdditionalField 
          && 
          <InputField
            {...fieldDefinitions.additionalField}
            placeholder="Additional field"
          />
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
          {...fieldDefinitions.capitals}
          label="Uppercase Field"
          beforeUpdate={getNextCursorPosition}
          afterUpdate={setCursorPosition}        />
      </fieldset>
      
      <FieldArray
        name="hobbies"
        component={renderHobbies}
      />
      <button type="submit" className="submitButton">
        Standard Submit (no client JS)
      </button>
      <FormStatus>
        {({isSubmitting, isValid}) => {
          return(
            <button
              type="submit"
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


const renderHobbies = ({fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Hobbies
    </legend>
    {fields.map((hobby, index) => (
      <div key={hobby}>
        <InputField
          {...fieldDefinitions.hobbies.name}
          name={`${hobby}[name]`}
          label={`Name #${index + 1}`}
        />      
        <InputField
          key={hobby}
          {...fieldDefinitions.hobbies.description}
          name={`${hobby}[description]`}
          label={`desc #${index + 1}`}
        >
          <button type="button" title="Remove Hobby" onClick={() => fields.remove(index)}>-</button>
        </InputField>
      </div>
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



const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function submitAsynchronous(values) {
  const response = await fetch('/exampleF', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });
  const result = await response.json();
  if (!result.isValid) {
    throw new SubmissionError(result.errors);
  }
  window.alert(`${result.successMessage}: ${JSON.stringify(result, null, 2)}`);
  Router.push(result.nextPage);
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


const revalidateField2 = form => {
  form.getField('field2').validate();
};

const revalidateTheNumber = form => {
  form.getField('theNumber').validate();
};

ExampleForm.propTypes = {
  form: PropTypes.object.isRequired
};
