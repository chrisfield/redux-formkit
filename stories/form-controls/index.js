import { withDocs } from 'storybook-readme';
import readme from './README.md'

import TextField from './text-field';
import IntegerField from './integer-field';
import RadioField from './radio-field';
import CheckboxField from './checkbox-field';

export {TextField};
export {IntegerField};
export {RadioField};
export {CheckboxField};

export default withDocs(readme, () => (''));