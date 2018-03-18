# redux-formkit

[![NPM Version](https://img.shields.io/npm/v/redux-formkit.svg?style=flat)](https://www.npmjs.com/package/redux-formkit)
[![NPM Downloads](https://img.shields.io/npm/dm/redux-formkit.svg?style=flat)](https://npmcharts.com/compare/redux-formkit?minimal=true)

Light-weight React components making it easy to write html forms connected to the Redux store. Includes validation, field-arrays and access to the valid/not-valid form status as fields are changed. 


## Getting Started
`npm install --save redux-formkit`

Try the [redux-formkit example](https://github.com/chrisfield/formapp). It runs with [create-react-app](https://github.com/facebook/create-react-app) so is easy to clone, install, start and edit. The example contains text fields, a numeric field, checkbox and radio inputs and a field-array with add/remove buttons. It has field and inter-field valiation, shows the current error count and the submit button goes green when the form is valid.

# Features
- Lightweight and fast
- Mimimal by design, leaves you in control
- Not cluttered with ui components
- Simple to use API
- Includes field-arrays for repeated rows with add/remove
- Form error-count/valid-status is easy to access, eg to put a tick next to the submit button
- Synchronous validation including flexible support for inter-field valiation
- Asynchronous validation
- Stores redux values as semantic types, eg number fields will store numbers
- Format values, eg to put commas in numbers

