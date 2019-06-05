import { storiesOf } from '@storybook/react';

import introduction from './introduction';
import simpleForm from './introduction/simple-form';

import field from './example-ui-components/field';
import textInput from './example-ui-components/text-input';
import numberInput from './example-ui-components/number-input';
import checkbox from './example-ui-components/checkbox';
import radioButton from './example-ui-components/radio-button';

import arrayForm from './forms/array-form';
import renderingForms from './forms/rendering';

import apiForFormStateProvider from './api/form-state-provider';
import apiForForm from './api/form';
import apiForField from './api/field';
import apiForHooks from './api/hooks';

import nextServerRendering from './next-js/server-rendering';
import nextHandleEarlyInput from './next-js/handle-early-input';
import nextUniversalValidation from './next-js/universal-validation';

import reactNativeForms from './react-native/react-native-forms';

storiesOf('Overview', module)
.add('Getting Started', introduction)
.add('Simple Form', simpleForm);

storiesOf('UI Components', module)
.add('Field', field)
.add('TextInput', textInput)
.add('Checkbox', checkbox)
.add('RadioButton', radioButton)
.add('NumberInput', numberInput);

storiesOf('Forms', module)
.add('Array Form', arrayForm)
.add('Rendering', renderingForms);


storiesOf('Api', module)
.add('FormStateProvider', apiForFormStateProvider)
.add('Form', apiForForm)
.add('Field', apiForField)
.add('Hooks', apiForHooks);

storiesOf('Next-js', module)
.add('Server Rendering', nextServerRendering)
.add('Handle Early Input', nextHandleEarlyInput)
.add('Universal Validation', nextUniversalValidation);

storiesOf('React-native', module)
.add('React-native forms', reactNativeForms);
