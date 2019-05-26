
import MyForm, {formDataHandler} from '../components/my-form';
import {useFormReducer} from 'redux-formkit'; 
import {updateFieldsAction, initFormStateAction} from 'redux-formkit';
import {updateFieldsAction as updateFieldsActionForRedux} from 'redux-formkit-redux-state-provider';

const Index = () => {
  const dispatch = useFormReducer('myForm')[1];
  return (
    <div>
      <MyForm/>
      <p onClick={()=>{
          dispatch(updateFieldsAction({fieldOne:'new f1', rb2: 'G', hobbies:[{name: 'Flying Kites'}]}));
        }}
      >click here</p>
    </div>
  );
};

Index.getInitialProps = async ({ req, res, reduxStore }) => {
  if (req && req.method === 'POST') {
    if (req.headers['content-type'] === 'application/json') {
      const formState = await formDataHandler(req.body);
      const isValid = formState.formStatus.errorCount + Object.keys(formState.formErrors).length === 0;
      res.json({
        errors: {
          myFormSubmitErrorMessage: isValid? '' : "Form not processed. Please make changes and try again.",
          ...formState.formErrors,
          ...filterErrors(formState.fieldStatus)
        },
        isValid,
        successMessage: isValid? 'Your data has been processed. Thank you.' : '',
        nextPage: `/form-result?theNumber=${formState.fieldValues.theNumber}`
      })
    } else {
      const formState = await formDataHandler(req.body, {isAlreadyFormattedForStore:false});
      const isValid = formState.formStatus.errorCount + Object.keys(formState.formErrors).length === 0;
      if (isValid) {
        res.writeHead(301, {Location:  `/form-result?theNumber=${formState.fieldValues.theNumber}`});
        res.end();
      } else {
        formState.formErrors.myFormSubmitErrorMessage = "Form not processed. Please make changes and try again.";
        reduxStore.dispatch(initFormStateAction('myForm', formState));
        return {};  
      }
    }
  } else {
    const formValues = {
      hobbies: [
        {
          name: 'Knitting',
          description: 'Wooly hats and scarves'
        }
      ],
      fieldOne: 'ssr',
      theNumber: 41,
      isAgreed: false,
      rb2: 'B'
    };
   reduxStore.dispatch(updateFieldsActionForRedux('myForm', formValues));
  }
  return {}
}

const filterErrors = (fieldStatus) => {
  const errors = {};
  Object.keys(fieldStatus).forEach(field => {
    if (fieldStatus[field].error) {
      errors[field] = fieldStatus[field].error;
    } 
  });
  return errors;
}

export default Index;