# Example form using redux-formkit without any redux dependency

## How to use

These instructions are for the 'complex' example but you can easily adapt them for any of the examples.

Download and rename any of the examples [or clone from the repo](https://github.com/chrisfield/redux-formkit):

```bash
curl https://codeload.github.com/chrisfield/redux-formkit/tar.gz/master | tar -xz --strip=2 "redux-formkit"-master/examples/complex
mv complex withoutredux
cd withoutredux
```

Remove the redux packages:

```bash
npm uninstall --save redux react-redux
```

Edit the top level index.js file to remove the <Provider> and </Provider> tags and take out the now unsed store and Provider imports ([note for nextjs](#nextjs-note)).

Edit ExampleForm.js to change the import of { connect } from react-redux to: 

```js
import { connectWithoutRedux as connect } from 'redux-formkit';
```

Install and run the example eg:

```bash
npm install
npm start
```

## Features
* Fully featured Formkit form running without redux

<a name="nextjs-note"></a>

  **Note**: For the nextjs example edit pages/_app.js file to remove the <Provider> and </Provider> tags and the call to withReduxStore. Take out the now unused Provider and withReduxStore imports.
