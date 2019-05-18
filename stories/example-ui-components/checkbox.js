import { withDocs } from 'storybook-readme';
import readme from './checkbox.md'

import React from 'react';
import TheForm from '../the-form';
import Checkbox from '../ui-components/checkbox';

const MyForm = () => {  
  return (
    <TheForm>
      <Checkbox name="isAgreed" label="Do you agree?"/>
    </TheForm>
  );
};

export default withDocs(readme, () => <MyForm/>);
