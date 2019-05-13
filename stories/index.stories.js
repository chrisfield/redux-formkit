import { storiesOf } from '@storybook/react';
import introduction from './introduction';
import uiComponents from './introduction/ui-components';
import apiForField from './api/field';


// import textField from './ui-components/text-field';
// import selectField from './ui-components/select-field';
// import basicForm from './form/basic';

storiesOf('Overview', module)
.add('Getting Started', introduction)
.add('UI Components', uiComponents);

storiesOf('Api', module)
.add('Field', apiForField);


// storiesOf('Forms', module)
//   .add('Basic', basicForm);

// storiesOf('UI Components', module)
// .add('TextField', textField)
// .add('SelectField', selectField);