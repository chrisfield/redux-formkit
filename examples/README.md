# Example forms built with  [redux-formkit](https://github.com/chrisfield/redux-formkit)


## Getting Started

Clone the `redux-formkit` repository and from the root directory:
* `cd ./examples/simple` or `cd ./examples/complex`
* `npm install`
* `npm start`


The examples runs with with [create-react-app](https://github.com/facebook/create-react-app). 

## The [simple form](https://github.com/chrisfield/redux-formkit/blob/master/examples/simple/src/components/ExampleForm.js) includes:

* Text fields
* Numeric field with formatting
* Checkboxes
* Radio buttons
* Syncronous submit


## The [complex form](https://github.com/chrisfield/redux-formkit/blob/master/examples/complex/src/components/ExampleForm.js) includes:

Complex form includes:
* Field-array with add/remove buttons
* Setting initial values
* Field and Inter-field valiation
* Conditional dynamic fields
* Current error count
* Submit button goes green when error count is zero
* Asynchronous submit
* Disabled submit button during submit
* Asynchronous validation with server-side messages displayed next to the relevant field
* Flexible positioning of other server-side validation messages

