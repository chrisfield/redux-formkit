import React from 'react';
import { storiesOf } from '@storybook/react';
import introduction from './introduction';
import formControls from './form-controls';
import basicForm from './form/basic';

storiesOf('Overview', module)
.add('Getting Started', introduction)
.add('UI Components', formControls);

storiesOf('Forms', module)
  .add('Basic', basicForm);
  