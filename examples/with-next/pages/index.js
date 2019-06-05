
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