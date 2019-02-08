import connectToFormkit from "./connect-to-formkit";

const FormStatus = (props) => (
  props.children(props)
);

const mapStateToProps = (state) => ({
  errorCount: state.formStatus.errorCount,
  isSubmitting: state.formStatus.isSubmitting,
  isValid: state.formStatus.isValid,
});

export default connectToFormkit(mapStateToProps)(FormStatus);
