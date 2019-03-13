import React from 'react';
import {TextInput, NumberInput} from './form-controls'; 
import { 
  Form,
  FieldArray,
  useForm,
  useField,
  useFormReducer
} from 'redux-formkit';


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

const submitValues = (values) => {
  alert(`You submitted: ${JSON.stringify(values, undefined, 2)}`);
};

const clearValues = (form) => {
  form.updateFields({});
};

const MyForm = () => {
  return (
    <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues} className="my-form">
      <div>
        <TextInput name="fieldOne" required afterUpdate={revalidateFieldTwo}/>
        <TextInput name="fieldTwo" required validate={greaterThanFieldOne}/>
        <FieldThree
          label="Name(try Fred):"
          required 
          placeholder="Dynamic - on fieldTwo"
          afterUpdate={suggest42ForFred}
        />
        <NumberInput name="age"/>
        <TextInput name="fieldFour"/>
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
  getField('fieldTwo').validate();
}

const suggest42ForFred = ({getField, value}) => {
  if (value.toLowerCase() === 'fred') {
    getField('age').setValue(42);
  }
}

const greaterThanFieldOne = (value, values) => (
  values && value > values.fieldOne? undefined: 'Field two must be greated that field one'
)

const RenderHobbies = ({fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Hobbies
    </legend>
    {fields.map((hobby, index) => (
      <div key={hobby}>
        <TextInput
          key={hobby}
          name={`${hobby}.description`}
          required
          label={`Hobby #${index + 1}`}
        >
          <button type="button" title="Remove Hobby" onClick={() => fields.remove(index)}>-</button>
        </TextInput>
      </div>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Hobby</button>
  </fieldset>
);

export default MyForm;
