import { withDocs } from 'storybook-readme';
import readme from './ui-components.md'

import React from 'react';
import TheForm from './the-form';
import {TextInput} from '../form-controls/text-input';

const MyForm = () => {  
  return (
    <TheForm>
      <TextInput name="firstName" label="First Name" required/>
    </TheForm>
  );
};

export default withDocs(readme, () => <MyForm/>);
