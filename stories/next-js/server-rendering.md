# Next.js - Server Rendered Forms

Next.js renders html on the server. It has several advantages including:
* Fast initial page load - particularly compared to SPA sites which don't render until the js loads.
* Progressive Web App - including AJAX loading just what needs to change and rich js facilities for modern clients
* Universal js - no separate language or templating on the server.

Server rendered forms can be written in exactly the same way as client rendered ones.

The code below shows how data can be passed to a form on the server. It is taken from [the with-next example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-next)

#### Code from pages/index.js
```
import MyForm from '../components/my-form';
import {FormStateProvider, useFormReducer, updateFieldsAction, formReducer} from 'redux-formkit'; 

const ResetButton = () => {
  const dispatch = useFormReducer('myForm')[1];
  return (
    <p onClick={()=>{
        dispatch(updateFieldsAction({fieldOne:'new f1'}));
      }}
    >click here</p>
  );
}

const Index = ({initialValues}) => {
  return (
    <FormStateProvider initialState={formReducer(undefined, {form: 'myForm', ...updateFieldsAction(initialValues)})}>
      <MyForm/>
      <ResetButton/>
    </FormStateProvider>
  );
};

Index.getInitialProps = async () => ({
  initialValues: {
    fieldOne:'val f1',
    hobbies: [{description: 'Cave Diving'}, {description: 'Knitting'}]
  }
});

export default Index;
```

#### Explaination
The code in the getInitialProps (called by next-js) returns the initialValues for the Index function.

Index passes these values to the `FormStateProvider`. The values will be included on the server rendered form and also sent to the browser to initialize the client React state.

