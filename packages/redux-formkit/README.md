# redux-formkit

### Go to [live examples, code and docs](https://chrisfield.github.io/redux-formkit/).

[![NPM Version](https://img.shields.io/npm/v/redux-formkit.svg?style=flat)](https://www.npmjs.com/package/redux-formkit)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-formkit.svg?style=flat)](https://npmcharts.com/compare/redux-formkit?minimal=true)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/redux-formkit.svg)

## Introduction
Redux-formkit is a lightweight, simple, and efficient solution for creating basic to complex forms in react. Use it to get and set field values, to validate and format fields, to create custom inputs and to keep track of the error count so you always know whether the form fields are all valid.

Out of the box it uses standard React state and it's easy to change from/to Redux using [ReduxFormkitReduxStateProvider](https://www.npmjs.com/package/redux-formkit-redux-state-provider).

Version 3 is influenced by [Informed](https://www.npmjs.com/package/informed) and it was written from scratch to use Hooks.

Earlier versions were influenced by the excellent [Redux-form](https://github.com/erikras/redux-form).


## Getting Started

##### Install with npm or yarn
`npm install --save redux-formkit` or `yarn add redux-formkit`


#### Create a Simple Form

```jsx
import React from 'react';
import {FormStateProvider, Form, Field} from 'redux-formkit';

const MyForm = () => {  
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues}>
        <label>First name: <Field name="firstName" component="input"/></label>
        <button>Submit</button>
      </Form>
    </FormStateProvider>
  );
};

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

export default MyForm;
```

## Features
- Small bundle size ([see bundlephobia](https://bundlephobia.com/result?p=redux-formkit))
- React-native support ([See example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with_react_native))
- Simple to use with next js ([See example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-next))
- Isomophic support to enter values before js downloads ([See example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-next-and-redux))
- Use without Redux and switch anytime by installing [`redux-formkit-redux-state-provider`](https://www.npmjs.com/package/redux-formkit-redux-state-provider) ([See example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-redux))
- Easy to migrate from/to redux-form
- Stores values as semantic types, eg number fields will store numbers
- Format values, eg to put commas in numbers
- Field-arrays for repeated rows with add/remove
- Keeps a running error-count and valid/not valid status
- Synchronous validation including flexible support for inter-field valiation
- Asynchronous submit validation [See example](https://github.com/chrisfield/redux-formkit/tree/master/examples/asynchronous-submit)


## Contributing [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/chrisfield/redux-formkit/issues)
I'm keen to get feedback please let me know about any issues [here](https://github.com/chrisfield/redux-formkit/issues/new)


---
### Go to [live examples, code and docs](https://chrisfield.github.io/redux-formkit/).