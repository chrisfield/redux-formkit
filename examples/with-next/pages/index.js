
import MyForm from '../components/my-form';
import {useFormReducer, updateFieldsAction} from 'redux-formkit'; 

const ResetButton = () => {
  const dispatch = useFormReducer('myForm')[1];
  return (
    <p onClick={()=>{
        dispatch(updateFieldsAction({fieldOne:'new f1', rb2: 'R'}));
      }}
    >click here</p>
  );
}

const Index = ({initialValues}) => {
  return (
    <div>
      <MyForm {...{ initialValues }}/>
      <ResetButton/>
    </div>
  );
};

Index.getInitialProps = async () => ({
  initialValues: {
    fieldOne:'val f1',
    hobbies: [{description: 'Cave Diving'}, {description: 'Knitting'}]
  }
});

export default Index;