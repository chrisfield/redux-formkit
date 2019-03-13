
import MyForm from '../components/my-form';
import {useFormReducer, updateFieldsAction} from 'redux-formkit'; 

const Index = ({initialValues}) => {
  const dispatch = useFormReducer('myForm')[1];
  return (
    <div>
      <MyForm {...{ initialValues }}/>
      <p onClick={()=>{
          dispatch(updateFieldsAction({fieldOne:'new f1'}));
        }}
      >click here</p>
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