import { withDocs } from 'storybook-readme';
import readme from './text-input.md'

import React from 'react';
import TheForm from '../lib/the-form';
import {TextInput} from '../lib/form-controls/text-input';

const MyForm = () => {  
  return (
    <TheForm>
      <TextInput name="firstName" label="First Name" required/>
    </TheForm>
  );
};

export default withDocs(readme, () => <MyForm/>);
