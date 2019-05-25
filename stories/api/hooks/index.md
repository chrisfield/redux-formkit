# Hooks

## useForm
`useForm()` can be called by any children/decsendants of a `Form`. It returns an object with one property: 
* `name`: the name of the form.

## useField
`useField('myFieldOne')` can be called by any children/decsendants of a `Form`. It takes a field-name as a parameter and returns an object with field properties about the field.
```
const PartnerName = () => {
  const isSingle = useField('isSingle').value;
  if (!isSingle) {
    return <TextInput name="partnerName" required/>
  }
  return null;
}
```
The  object returned by useField includes these standard props: 
* `value`: value from the store
* `error`: undefined if valid. Otherwise an error which will usually be a string (but can be any plain object)
* `touched`: boolean. has the field been tabbed through or validated due to submit 
* `dispatch`: function to dispatch a an action for this field to the form-reducer
* `customProps`: A prop set to the value returned by a `beforeUpdate function` (see Field Api for more info)


## useFormReducer
`useFormReducer('myForm')` can be called by any children/decsendants of a `FormStateProvder`. It takes a form-name as a parameter and returns state and dispatch in a two element array. The returned array is like the one that would be returned from the standard [React useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) hook. This simularity is no accident because, when you are not using redux, useFormReducer just passes the work on to useReducer.

If you are using `Redux` then the `[state, dispatch]` returned from a call to `useFormReducer('formOne')` will from Redux but will still be specifically for the named form.  
```
const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};
```

