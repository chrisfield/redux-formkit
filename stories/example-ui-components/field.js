import { withDocs } from 'storybook-readme';
import readme from './field.md'

import React from 'react';
import TheForm from '../the-form';
import {Field, useField} from '../../packages/redux-formkit/src';

const required = value => (
  value && value.trim && value.trim().length > 0 ? undefined: 'Please enter a value'
);

const ErrorMessage = ({name}) => {
  const field = useField(name);
  return (field.touched && field.error)? <p>Error: {field.error}</p>: null;
};

const MyForm = () => {  
  return (
    <TheForm>
      <div>
        <label>First name: <Field name="firstName" component="input" validate={required}/></label>
        <ErrorMessage name="firstName"/>
      </div>
      <div>
        <label>Middle name: 
          <Field name="middleName" validate={required} render= {
            ({handleChange, handleBlur, value, touched, error}) => (
              <>
                <input onChange={handleChange} onBlur={handleBlur} value={value}/>
                {(touched && error)? <p>Error: {error}</p>: null}
              </>
            )
          }/>
        </label>
      </div>
      <div>
        <label>Last name: 
          <Field name="lastName" validate={required}>
            {({handleChange, handleBlur, value, touched, error}) => (
              <>
                <input onChange={handleChange} onBlur={handleBlur} value={value}/>
                {(touched && error)? <p>Error: {error}</p>: null}
              </>
            )}
          </Field>
        </label>
      </div>
    </TheForm>
  );
};

export default withDocs(readme, () => <MyForm/>);
