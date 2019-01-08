import * as PropTypes from 'prop-types';
import connectToFormkit from './connect-to-formkit';
import getField from './state-utils/get-field';

const ValidationStatus = props => (
  props.children({error: props.error, touched: props.touched})
);


const mapStateToProps = (state, ownProps) => {
  const status = getField(state.fieldStatus, ownProps.name) || {};
  const touched = status.touched;
  const error = status.error || getField(state.fieldErrors, ownProps.name);
  return {
    error,
    touched
  };
};



export default connectToFormkit(mapStateToProps)(ValidationStatus);
