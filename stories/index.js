import { storiesOf } from '@storybook/react';
import introduction from './introduction';
import textField from './ui-components/text-field';
import basicForm from './form/basic';

storiesOf('Overview', module)
.add('Getting Started', introduction);

storiesOf('Forms', module)
  .add('Basic', basicForm);

storiesOf('UI Components', module)
  .add('TextField', textField);
    