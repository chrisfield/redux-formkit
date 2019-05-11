import { configure , addDecorator, addParameters } from '@storybook/react';
import { addReadme } from 'storybook-readme';

addParameters({
  name: 'redux-formkit',
  url: 'https://chrisfield.github.io/redux-formkit',
  options: {
    showPanel: false,
    panelPosition: 'right'
  }
});

addDecorator(addReadme);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}


configure(loadStories, module);

