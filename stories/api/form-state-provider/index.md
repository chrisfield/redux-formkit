# FormStateProvider

Provides a context for form state. `Form` components must directly or indirectly be inside a `FormStateProvider`.
Any children/descendants of FormStateProvider can use the `useFormReducer` hook to get form state and a dispatch function.

The `FormStateProvider` included in `redux-formkit` makes use of the standard React useReducer hook.

Apart from children (which will often be `Forms`) `FormStateProvider` does not take other props.

`FormStateProvider` gives you choices over where you store form state. eg you could have one `FormStateProvider` at the root of an application or have a separate one for each form or anything in between.

If you want to use `Redux` use the [redux-formkit-redux-state-provider](https://www.npmjs.com/package/redux-formkit-redux-state-provider) npm module