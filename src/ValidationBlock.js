import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import getFormState from './selectors/getFormState';
import getFieldValue from './selectors/getFieldValue';
import {FormContext} from './Formkit';

const ValidationBlock = (props) => {
  const {Component, ...otherProps} = props;
  if (Component) {
    return <Component {...otherProps} />
  }  
  return props.children({
    ...props
  });
};


ValidationBlock.propTypes = {
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}


const mapStateToProps = (state, ownProps) => {
  const formState = getFormState(state, ownProps.form.name);
  const fieldStatus = getFieldValue(formState.status, ownProps.name) || {};

  return {
    error: fieldStatus.error || getFieldValue(formState.errors, ownProps.name),
  };
};

const ConnectedValidationBlock = connect(
  mapStateToProps
)(ValidationBlock);

export default React.forwardRef((props, ref) => (
  <FormContext.Consumer>
    {form => <ConnectedValidationBlock {...props} form={form} ref={ref} />}
  </FormContext.Consumer>
));
