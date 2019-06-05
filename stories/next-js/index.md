# Next.js - Server Rendered Forms

Next.js renders html on the server. It has several advantages including:
* Fast initial page load - particularly compared to SPA sites which don't render until the js loads.
* Progressive Web App - including AJAX loading just what needs to change and rich js facilities for modern clients
* Universal js - no separate language or templating on the server.

An initial fast load of a form can be good for peceived performance. However any changes entered on the form would be overwritten because, when the javascript runs, it sets the controlled inputs to match the state. One way round this would be to initially disable the form inputs. Redux-formkit provides a better solution.

## Redux-formkit forms are usable even before the js downloads
The Field component includes code to update the form-state with the value on the page. In this way your form renders quickly, standard html elements are immediately usable, data is not lost and validation, formatting etc kick in as soon as the Javascript is available.

Checkout the [with-next](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-next) example.

Run the example and in the chrome dev-tools network tab choose the slow-3g option. While the javascript is downloading you will be able to use the server rendered html-form.

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
The code above sets initialValues in the getInitialProps which is called by next-js as pages are rendered on the server. 

The Index function includes a `FormStateProvider` containing the form. The FormStateProvider has the initial state set using the redux-formkit formReducer using an updateFields action with the values retuened from getInitialProps.

Note that usually updateFields would have the form name added by the dispatch function returned from useFormReducer. Here, since the code is not using that dispatch function I added the form-name separately.
