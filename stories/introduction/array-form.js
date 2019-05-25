import { withDocs } from 'storybook-readme';
import readme from './array-form.md'
import React from 'react';
import {TextInput} from '../ui-components';
import { 
  FormStateProvider,
  Form,
  FieldArray,
  useForm,
  useFormReducer
} from '../../packages/redux-formkit/src';

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
    <FormStateProvider>
      <Form name="myForm" initialValues={{hobbies:[{}]}} onSubmit={submitValues} onSubmitSuccess={clearValues} className="my-form">
        <FieldArray
          name="hobbies"
          component={RenderHobbies}
        />
        <button>Submit</button>
        <TheFormState />
      </Form>
    </FormStateProvider>
  );
};

const RenderHobbies = ({fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Hobbies
    </legend>
    {fields.map((hobby, index) => (
      <div key={`${hobby}.name`}>
        <TextInput
          key={hobby}
          name={`${hobby}.name`}
          required
          label="Hobby name"
        />
        <TextInput
          key={`${hobby}.notes`}
          name={`${hobby}.notes`}
          required
          label="notes"
          size="60"
        >
        </TextInput>
        <button type="button" title="Remove Hobby" onClick={() => fields.remove(index)}>-</button>
        <hr/>
      </div>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Hobby</button>
  </fieldset>
);

export default withDocs(readme, () => <MyForm/>);
