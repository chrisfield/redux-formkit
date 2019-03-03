import React from 'react';
import {Form, Field, useFormReducer, FormStatus} from 'redux-formkit';
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
        <form className="example-form"> {/*No need for this to be a form. It can be a div/section etc */}
            <Field
              name="myInput"
              component="input"
            />
            <InputField
              label="Short Name"
              name="shortName"
              validate={requiredMaxLength5}
            />
        </form>
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

export default ExampleForm;