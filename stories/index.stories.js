import { storiesOf } from '@storybook/react';
import introduction from './introduction';
import simpleForm from './introduction/simple-form';
import arrayForm from './introduction/array-form';
import field from './example-ui-components/field';
import textInput from './example-ui-components/text-input';
import checkbox from './example-ui-components/checkbox';
import radioButton from './example-ui-components/radio-button';
import apiForField from './api/field';

storiesOf('Overview', module)
.add('Getting Started', introduction)
.add('Simple Form', simpleForm)
.add('Array Form', arrayForm);

storiesOf('UI Components', module)
.add('Field', field)
.add('TextInput', textInput)
.add('Checkbox', checkbox)
.add('RadioButton', radioButton);

storiesOf('Api', module)
.add('Field', apiForField);
