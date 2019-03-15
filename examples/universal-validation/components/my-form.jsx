import React from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import {createFormDataHandler, getFieldDefinitionsByName} from '../form-data-handler';
import {TextInput, NumberInput, RadioButton, Checkbox} from './form-controls'; 
import { 
  Form,
  FieldArray,
  useForm,
  useField,
  useFormReducer,
  SubmissionError
} from 'redux-formkit';

import {
  upper,
  lower,
  number,
  addCommas,
  maxLength,
  requiredStr,
  requiredNum,
} from './form-controls/utils';

// validation

const greaterThanFieldOne = (value, values) => (
  values && value > values.fieldOne? undefined: 'Field two must be greated that field one'
)

const maxLength5 = maxLength(5);
const requiredMaxLength5 = [requiredStr, maxLength5];

const checkboxChecked = value => !!value;

const definedFieldsForDataHandler = [
  {
    name: 'fieldOne',
    validate: requiredMaxLength5
  },
  {
    name: 'fieldTwo',
    validate: greaterThanFieldOne
  },
  {
    name: 'fieldThree'
  },
  {
    name: 'isAgreed',
    formatToStore: checkboxChecked
  },
  {
    name: 'theNumber',
    formatToStore: number,
    formatFromStore: addCommas,
    validate: requiredNum
  },
  {
    name: 'capitals',
    formatToStore: upper,
    formatFromStore: lower,
    validate: requiredStr
  },
  {
    name: 'rb2',
    validate: value => (value === 'R' || value ==='G' || value === 'B') ? undefined : 'RGB only'
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

// end of validation


const FieldThree = (props) => {
  const f2 = useField('fieldTwo').value;
  if (f2) {
    return <TextInput name="fieldThree" {...props}/>
  }
  return null;
}

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const clearValues = (form) => {
  form.updateFields({});
};

const ErrorMessage = ({name}) => {
  const { error } = useField(name);
  return error ? <p>{error}</p>: null;
};

const MyForm = () => {
  return (
    <Form
      name="myForm"
      onSubmit={submitValues}
      onSubmitSuccess={clearValues}
      className= "my-form"
      method="POST" 
      action="/myForm"
    >
      <ErrorMessage name="myFormSubmitErrorMessage"/>
      <div>
        <TextInput {...fieldDefinitions.fieldOne} afterUpdate={revalidateFieldTwo}/>
        <TextInput {...fieldDefinitions.fieldTwo}/>
        <FieldThree
          label="Name(try Fred):"
          required 
          placeholder="Dynamic - on fieldTwo"
          afterUpdate={suggest42ForFred}
        />
        <Checkbox
          {...fieldDefinitions.isAgreed}
          label="Can the server have a number bigger than 42?"
          afterUpdate={revalidateTheNumber}
        />
        <NumberInput {...fieldDefinitions.theNumber}/>
        <TextInput
          {...fieldDefinitions.capitals}
          label="Uppercase Field"       
        />
        <div>
          <fieldset>
            <legend>Favorate color</legend>
            <div className="radioButtons">
              <RadioButton name="rb2" label="Red" value="R"/>
              <RadioButton name="rb2" label="Green" value="G"/>
              <RadioButton name="rb2" label="Blue" value="B"/>
            </div>
          </fieldset>
        </div>
      </div>
      <FieldArray
        name="hobbies"
        component={RenderHobbies}
      />
      <button>Submit</button>
      <TheFormState />
    </Form>
  );
};

const revalidateFieldTwo = ({getField, value}) => {
  getField('fieldTwo').setTouched(false);
  getField('fieldOne').validate();
}

const revalidateTheNumber = ({getField}) => {
  getField('theNumber').validate();
};

const suggest42ForFred = ({getField, value}) => {
  if (value.toLowerCase() === 'fred') {
    getField('age').setValue(42);
  }
}

const RenderHobbies = ({fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Hobbies
    </legend>
    {fields.map((hobby, index) => (
      <div key={hobby}>
        <TextInput
          {...fieldDefinitions.hobbies.name}
          name={`${hobby}[name]`}
          label={`Name #${index + 1}`}
        /> 
        <TextInput
          key={hobby}
          {...fieldDefinitions.hobbies.description}
          name={`${hobby}[description]`}
          label={`desc #${index + 1}`}
        >
          <button type="button" title="Remove Hobby" onClick={() => fields.remove(index)}>-</button>
        </TextInput>
      </div>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Hobby</button>
  </fieldset>
);

async function submitValues(values) {
  const response = await fetch('/myForm', {
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

export default MyForm;
