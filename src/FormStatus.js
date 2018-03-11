import {connect} from 'react-redux';
import getFormState from './selectors/getFormState';

const formStatus = (props) => (
  props.children({...props})
);

const mapStateToProps = (state, ownProps) => {
  const formStatus = getFormState(state, ownProps.form.name).status;
  return {
    errorCount: formStatus.errorCount,
    isValid: formStatus.errorCount === 0
  }
};

export default connect(
  mapStateToProps
)(formStatus);

