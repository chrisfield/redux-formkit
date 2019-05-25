import { withDocs } from 'storybook-readme';
import readme from './number-input.md'

import React from 'react';
import TheForm from '../the-form';
import NumberInput from '../ui-components/number-input';

const MyForm = () => {  
  return (
    <TheForm>
      <NumberInput name="salary" label="Salary" required/>
    </TheForm>
  );
};

export default withDocs(readme, () => <MyForm/>);
