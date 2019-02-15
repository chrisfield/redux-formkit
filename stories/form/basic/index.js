import { withDocs } from 'storybook-readme';
import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import ExampleFrom from './example-form';
import readme from './README.md'

const BasicForm = () => ( 
  <Provider store={store}>
    <ExampleFrom />
  </Provider>
)

export default withDocs(readme, BasicForm);
