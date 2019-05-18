import { storiesOf } from '@storybook/react';
import introduction from './introduction';
import simpleForm from './introduction/simple-form';
import textInput from './example-ui-components/text-input';
import checkbox from './example-ui-components/checkbox';
import radioButton from './example-ui-components/radio-button';
import apiForField from './api/field';

// import textField from './ui-components/text-field';
// import selectField from './ui-components/select-field';
// import basicForm from './form/basic';

storiesOf('Overview', module)
.add('Getting Started', introduction)
.add('Simple Form', simpleForm);

storiesOf('Example UI Components', module)
.add('TextInput', textInput)
.add('Checkbox', checkbox)
.add('RadioButton', radioButton);

storiesOf('Api', module)
.add('Field', apiForField);


// storiesOf('Forms', module)
//   .add('Basic', basicForm);

// storiesOf('UI Components', module)
// .add('TextField', textField)
// .add('SelectField', selectField);