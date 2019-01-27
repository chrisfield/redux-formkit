import {connect} from 'react-redux';
import ExampleForm, {formDataHandler} from '../components/example-form';
import FormStateUpdater from '../components/form-state-updater';
import {updateFieldsAction, initFormStateAction} from 'redux-formkit';

const Index = (props) => {
  return (
    <div>
      <ExampleForm {...props}/>
      <FormStateUpdater/>
    </div>
  );
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

Index.getInitialProps = async props => {
  const { req, res, reduxStore } = props;
  if (req && req.method === 'POST') {
    if (req.headers.contentType === 'application/json') {
      const formState = await formDataHandler(req.body);
      const isValid = formState.formStatus.errorCount === 0;
      res.json({
        errors: {
          formErrorAtTop: isValid? '' : "Form not processed. Please make changes and try again.",
          ...formState.fieldErrors,
          ...filterErrors(formState.fieldStatus)
        },
        isValid,
        successMessage: isValid? 'Your data has been processed. Thank you.' : '',
        nextPage: `/page-two?theNumber=${formState.fieldValues.theNumber}`
      })
    } else {
      const formState = await formDataHandler(req.body, {isAlreadyFormattedForStore:false});
      if (formState.formStatus.errorCount === 0) {
        res.writeHead(301, {Location:  `/page-two?theNumber=${formState.fieldValues.theNumber}`});
        res.end();
      } else {
        reduxStore.dispatch(initFormStateAction('exampleF', formState));
        return {};  
      }
    }
  } else {
    const formValues = {
      hobbies: [
        {
          name: 'Knitting',
          description: 'Hats and Scarves'
        },
      ],
      field1: 'def',
      field2: 'nop',
      theNumber: 41,
      isAgreed: true,
      rb2: 'B'
    };
    reduxStore.dispatch(updateFieldsAction('exampleF', formValues));
  }
  return {}
}

const connectedForm = connect()(Index);


export default connectedForm;
