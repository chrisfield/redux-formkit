import React from 'react';
import {Form, Field, useFormReducer, NamedValidationStatus} from 'redux-formkit';
import {InputField, /*RadioField, CheckboxField*/} from './form-controls';
import {number, addCommas, maxLength, requiredStr, requiredNum} from './form-controls/utils';

const ExampleForm = (props) => {
  const [state] = useFormReducer("exampleF");
  return (
    <div>
      <Form
        name="exampleF"
        initialValues = {initialValues}    
      >
        <NamedValidationStatus name="formErrorAtTop" >
          {({error}) => {
            if (error) {
              return <p>{error}</p>
            };
            return null;
          }}
        </NamedValidationStatus>
        <Field
          name="myInput"
          component="input"
        />
        <InputField
          label="Short Name"
          name="shortName"
          validate={requiredMaxLength5}
          afterUpdate={revalidateOtherName}
        />
        <InputField label="Other Name" name="otherName" validate={greaterThanShortName}/>
      </Form>
      <p>
      Field Values: {JSON.stringify(state.fieldValues)}
      </p><p>
      Field Status: {JSON.stringify(state.fieldStatus)}
      </p>
    </div>
  )
};

const initialValues = {
  hobbies: [
    {description: 'stamp collecting'}
  ],
  theNumber: 42,
  isAgreed: true,
  rb2: 'G'
};

const maxLength5 = maxLength(5);
const requiredMaxLength5 = [requiredStr, maxLength5];

const greaterThanShortName = (value, values) => (
  values && value > values.shortName? undefined: `Other name should be alphabecically after ${values.shortName}`
);

export default ExampleForm;