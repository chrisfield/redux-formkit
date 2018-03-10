import {connect} from 'react-redux';

const formStatus = (props) => (
  props.children({...props})
);

const mapStateToProps = (state, ownProps) => {
  const formName = ownProps.form.name;
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
)(formStatus);
