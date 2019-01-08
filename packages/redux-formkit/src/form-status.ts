import PropTypes from 'prop-types';
import connectToFormkit from './connect-to-formkit';

const FormStatus = props => (
  props.children(props)
);

const mapStateToProps = state => ({
  errorCount: state.formStatus.errorCount,
  isValid: state.formStatus.isValid,
  isSubmitting: state.formStatus.isSubmitting
});

export default connectToFormkit(mapStateToProps)(FormStatus);
