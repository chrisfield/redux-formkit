import { withDocs } from 'storybook-readme';
import readme from './index.md'

import React from 'react';
import TheForm from '../../the-form';
import {NumberInput} from '../../ui-components';

const MyForm = () => {  
  return (
    <TheForm>
      <NumberInput name="age" label="Age" required/>
    </TheForm>
  );
};

export default withDocs(readme, () => <MyForm/>);