## API

### Form

`Form` is a component that will render a form and act as a container for Fields.

It accepts the following props:

* `name : required string` — the name of the form eg 'sign-up'

* `initialValues : optional object` — this is one way to set field values. 

* `onSubmit : optional function` —  use this to submit the field-values which will be passed in as a parameter. It can make api calls syncronously or by returning a promise. It will only be called if the form fields are valid. An important point to make is that this function can throw exceptions that pass error messages back to the form. eg
```
  throw new SubmissionError({
    username: "This username has already been taken. Please try another."
  }); 
```

* `onSubmitSuccess : optional function` — use this to reset the form fields or show a feedback message etc. It will be passed the form instance as a parameter.


### hooks
`useFormReducer(formName)` like the familiar useReducer it returns state and dispatch as two elements in an array. This hook can be called from any component under the `FormStateProvider` (eg if the `FormStateProvider` is at the root of the component tree it can be called from all components).

`useForm()` returns an object that has one property `name`. It can be called from any components under a `Form`. I expect this to mostly be used together with `useFormReducer` to avoid hardcoding form names.

`useField(fieldName)` returns a <a href="#fieldInterface">`fieldInteface`</a> object. It can be called from any components under a `Form`.

### updateFieldsAction
`updateFieldsAction(values)` returns an action object ready to dispatch to a formReducer. Dispatching this will reinitialize the form updating all fields with the values provided and setting them all as untouched.

### updateFieldAction
`updateFieldAction(fieldName, value)` returns an action object ready to dispatch to a formReducer. Dispatching this will update one field leaving the others unchanged.