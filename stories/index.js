import { storiesOf } from '@storybook/react';
import Intro from './intro';
import basicForm from './form/basic';

storiesOf('Introduction', module).add('Getting Started', Intro);  

storiesOf('Form', module)
  .add('Basic', basicForm);
  