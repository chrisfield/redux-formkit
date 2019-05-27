import { storiesOf } from '@storybook/react';

import introduction from './introduction';
import simpleForm from './introduction/simple-form';
import arrayForm from './introduction/array-form';

import field from './example-ui-components/field';
import textInput from './example-ui-components/text-input';
import numberInput from './example-ui-components/number-input';
import checkbox from './example-ui-components/checkbox';
import radioButton from './example-ui-components/radio-button';

import apiForFormStateProvider from './api/form-state-provider';
import apiForForm from './api/form';
import apiForField from './api/field';
import apiForHooks from './api/hooks';

import nextJs from './next-js';

storiesOf('Overview', module)
.add('Getting Started', introduction)
.add('Simple Form', simpleForm)
.add('Array Form', arrayForm);

storiesOf('UI Components', module)
.add('Field', field)
.add('TextInput', textInput)
.add('Checkbox', checkbox)
.add('RadioButton', radioButton)
.add('NumberInput', numberInput);

storiesOf('Api', module)
.add('FormStateProvider', apiForFormStateProvider)
.add('Form', apiForForm)
.add('Field', apiForField)
.add('Hooks', apiForHooks);

storiesOf('Next-js', module)
.add('Server Rendering', nextJs)
