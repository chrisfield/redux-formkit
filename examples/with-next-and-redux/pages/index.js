
import MyForm from '../components/my-form';
import {useFormReducer} from 'redux-formkit'; 
import {updateFieldsAction} from 'redux-formkit';
import {updateFieldsAction as updateFieldsActionForRedux} from 'redux-formkit-redux-state-provider';

const Index = () => {
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

Index.getInitialProps = ({ reduxStore }) => {
  const formValues = {
    hobbies: [
      {description: 'Fishing'},
      {description: 'Knitting'},
      {description: ''},
    ],
    fieldOne: 'ssr',
    theNumber: 41,
    isAgreed: true,
    rb2: 'B'
  };


  reduxStore.dispatch(updateFieldsActionForRedux('myForm', formValues));

  return {};

};

export default Index;