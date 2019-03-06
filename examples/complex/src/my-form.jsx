import React from 'react';
import {TextInput, NumberInput} from './form-controls.jsx'; 
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
    <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearValues}>
      <div>
        <TextInput name="fieldOne" required/>
        <TextInput name="fieldTwo"/>
        <FieldThree required placeholder="Dynamic - on fieldTwo"/>
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
