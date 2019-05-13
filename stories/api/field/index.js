import { withDocs } from 'storybook-readme';
import readme from './index.md'

import React from 'react';
import TheForm from '../../introduction/the-form';
import {NumberInput} from '../../form-controls';

const MyForm = () => {  
  return (
    <TheForm>
      <NumberInput name="age" label="Age" required/>
    </TheForm>
  );
};

export default withDocs(readme, () => <MyForm/>);