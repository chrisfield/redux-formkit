
import MyForm from '../components/my-form';
import {useFormReducer} from 'redux-formkit'; 
import {updateFieldsAction} from 'redux-formkit';
import {updateFieldsAction as updateFieldsActionForRedux} from 'redux-formkit-redux-state-provider';

const ResetButton = () => {
  const [dispatch] = useFormReducer('myForm');
  return (
    <p onClick={()=>{
        dispatch(updateFieldsAction({fieldOne:'new f1', rb2: 'R'}));
      }}
    >click here</p>
  );
}

const Index = () => {
  return (
    <div>
      <MyForm/>
      <ResetButton/>
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
    rb2: 'G'
  };


  reduxStore.dispatch(updateFieldsActionForRedux('myForm', formValues));

  return {};

};

export default Index;