
import MyForm from '../components/my-form';
import {useFormReducer, updateFieldsAction} from 'redux-formkit'; 

export default () => {
  const dispatch = useFormReducer('myForm')[1];
  return (
    <div>
      <MyForm/>
      <p onClick={()=>{
          dispatch(updateFieldsAction({fieldOne:'new f1'}));
        }}
      >click here</p>
    </div>
  );
};