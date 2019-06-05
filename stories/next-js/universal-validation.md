# Next.js - universal validation

Checkout [the universal-validation example](https://github.com/chrisfield/redux-formkit/tree/master/examples/universal-validation). It shows separation of the validation/formatting from the rendering of the form. The defined validation/formatting is then used in two places
- In the client browser (eg. for the client browser to validate fields with onChange events)
- On the server (eg the form-data-handler validates sets of submitted data)

A secondary point from the example is that it has been written to allow data to be posted in two ways:
- JSON content - eg when the form is submitted asyncronously using 'Send' button (postman would work too)
- form-urlencoded content - eg when client JS is disabled or using 'Standard Submit (no client JS) button' 

Whichever way data is sent it will be validated/formatted consistently because the same code has been used.

If you run the example try tuning javascript off: Messages for errors that would have been caught on the client are now displayed when the form is redisplayed after submission to the server.

#### Code extract from components/my-form.jsx
```
const definedFieldsForDataHandler = [
  {
    name: 'fieldOne',
    validate: requiredMaxLength5
  },
  {
    name: 'fieldTwo',
    validate: greaterThanFieldOne
  },
  {
    name: 'fieldThree'
  },
  {
    name: 'isAgreed',
    formatToStore: checkboxChecked
  },
  {
    name: 'theNumber',
    formatToStore: number,
    formatFromStore: addCommas,
    validate: requiredNum
  },
  {
    name: 'capitals',
    formatToStore: upper,
    formatFromStore: lower,
    validate: requiredStr
  },
  {
    name: 'rb2',
    validate: value => (value === 'R' || value ==='G' || value === 'B') ? undefined : 'RGB only'
  },
  {
    name: 'hobbies',
    fieldArray: [
      {
        name: 'name',
        validate: requiredStr
      },
      {
        name: 'description'
      }
    ]
  }
];
```