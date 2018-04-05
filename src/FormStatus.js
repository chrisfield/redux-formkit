import React, {Component} from 'react';
import {connect} from 'react-redux';
import getFormState from './selectors/getFormState';
import {FormContext} from './Formkit';

const FormStatus = (props) => (
  props.children({...props})
);

const mapStateToProps = (state, ownProps) => {
  const formStatus = getFormState(state, ownProps.form.name).status;
  return {
    errorCount: formStatus.errorCount,
    isValid: formStatus.errorCount === 0,
    isSubmitting: formStatus.isSubmitting
  }
};

const ConnectedFormStatus = connect(
  mapStateToProps
)(FormStatus);

export default React.forwardRef((props, ref) => (
  <FormContext.Consumer>
    {form => <ConnectedFormStatus {...props} form={form} ref={ref} />}
  </FormContext.Consumer>
));

