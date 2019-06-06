# FormStateProvider

Provides a context for form state. `Form` components must directly or indirectly be inside a `FormStateProvider`.
Any children/descendants of FormStateProvider can use the `useFormReducer` hook to get form state and a dispatch function.

The `FormStateProvider` included in `redux-formkit` makes use of the standard React useReducer hook.

| Property Name | Required | Description                                                                                                            |
|---------------|----------|------------------------------------------------------------------------------------------------------------------------|
| initialState  |          | Object. The initialState of the form. I recomend you use the formkit reducer to construct this object (see code below) |
| children      |          | Node or Nodes. Normal JSX children (will often directly or indirectly include Form or Forms)                           |

`FormStateProvider` gives you choices over where you store form state. eg you could have one `FormStateProvider` at the root of an application or have a separate one for each form or anything in between.

If you want to use `Redux` use the [redux-formkit-redux-state-provider](https://www.npmjs.com/package/redux-formkit-redux-state-provider) npm module

#### Setting initialState
Passing initialState to `FormStateProvider` can be used instead of passing initialValues to a form. Setting initialState is the via `FormStateProvider` is particularly useful for server-side rendered forms. 

The code below is taken from [the with-next example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-next).

```
import MyForm from '../components/my-form';
import {FormStateProvider, updateFieldsAction, formReducer} from 'redux-formkit'; 

const Index = ({initialValues}) => {
  return (
    <FormStateProvider initialState={formReducer(undefined, {form: 'myForm', ...updateFieldsAction(initialValues)})}>
      <MyForm/>
    </FormStateProvider>
  );
};

Index.getInitialProps = async () => ({
  initialValues: {
    fieldOne:'val f1',
    hobbies: [{description: 'Cave Diving'}, {description: 'Knitting'}]
  }
});
```