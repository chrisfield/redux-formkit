import { withDocs } from 'storybook-readme';
import readme from './radio-button.md'

import React from 'react';
import TheForm from '../the-form';
import RadioButton from '../ui-components/radio-button';

const MyForm = () => {  
  return (
    <TheForm>
      <div>
        <RadioButton name="rb2" label="Red" value="R" />
        <RadioButton name="rb2" label="Green" value="G" />
        <RadioButton name="rb2" label="Blue" value="B" />
      </div>
    </TheForm>
  );
};

export default withDocs(readme, () => <MyForm/>);
