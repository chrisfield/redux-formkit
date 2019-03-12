
import MyForm from '../components/my-form';
import {useFormReducer, updateFieldsAction} from 'redux-formkit'; 

export default () => {
  const dispatch = useFormReducer('myForm')[1];
  return (
    <div>
      <MyForm/>
      <p onClick={()=>{
          dispatch(updateFieldsAction('myForm', {fieldOne:'new f1'}));
          console.log('here clicked');
        }}
      >click here</p>
    </div>
  );
};