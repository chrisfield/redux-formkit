import {connect} from 'react-redux';
import {updateFieldAction, updateFieldsAction} from 'redux-formkit';

const FormStateUpdater = ({updateField, updateFields}) => {
  return (
    <div>
      <p onClick={updateField}>Click here to update field1</p>
      <p onClick={updateFields}>Click here to update all fields</p>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateField: () => {dispatch(updateFieldAction('exampleF', 'field1', 'abcdef'))},
  updateFields: () => {dispatch(updateFieldsAction('exampleF', fieldValues))}
});

const fieldValues = {
  hobbies: [
    {description: 'sky diving'},
    {description: 'knitting'}
  ],
  field1: 'One Value',
  theNumber: 420,
  isAgreed: false,
  rb2: 'R'
};

export default connect(undefined, mapDispatchToProps)(FormStateUpdater);
