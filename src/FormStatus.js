import {connect} from 'react-redux';

const FieldWrapperStatus = (props) => (
  props.children({...props})
);

const mapStateToProps = (state, ownProps) => {
  const formName = ownProps.fieldWrapper.name;
  if (!state.form[formName]) {
    return {isValid: false};
  }
  const formStatus = state.form[formName].status;

  return {
    errorCount: formStatus.errorCount,
    isValid: formStatus.errorCount === 0
  }
};

export default connect(
  mapStateToProps
)(FieldWrapperStatus);
