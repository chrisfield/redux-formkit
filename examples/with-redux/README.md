# Example with-redux form

## How to use

Download the example [or clone the repo](https://github.com/chrisfield/redux-formkit):

```bash
curl https://codeload.github.com/chrisfield/redux-formkit/tar.gz/master | tar -xz --strip=2 "redux-formkit"-master/examples/with-redux
cd with-redux
```

Install it and run:

```bash
npm install
npm start
# or
yarn install
yarn start
```

## The idea behind the example
Version 3 of redux-formkit uses standard react state so I removed it's dependency on redux by splitting out redux related code to a separate npm module - [redux-formkit-redux-state-provider](https://www.npmjs.com/package/redux-formkit-redux-state-provider). This small module passes the redux state and dispatch to context of redux-formkit. The relevant code is all in [index.js](https://github.com/chrisfield/redux-formkit/blob/master/examples/with-redux/src/index.js)