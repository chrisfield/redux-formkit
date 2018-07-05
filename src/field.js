import React from 'react';
import PropTypes from 'prop-types';
import connectToFormkit from './connect-to-formkit';
import {updateField, setFieldTouched, deregisterField} from './actions';
import getField from './state-utils/get-field';


class Field extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {};
    this.setElementRef = this.setElementRef.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showAnyErrors = this.showAnyErrors.bind(this);
    this.getTargetValue = this.props.getTargetValue || defaultGetTargetValue;
    this.formatToStore = this.props.formatToStore || defaultFormatToStore;

    this.fieldInterface = {
      validate: () => {this.validate(this.props.rawValue, undefined, true)}
    }
  }

  componentDidMount() {
    this.props.formkitForm.registerField(this);
    if (this.elementRef) {
      if (!this.props.useTargetCondition || this.props.useTargetCondition(this.elementRef)) {
        const rawValue = this.formatToStore(this.getTargetValue(this.elementRef));
        this.validate(rawValue, {touched: false});
      }        
    } else {
      this.validate(this.props.rawValue, {touched: false});
    }    
  }

  componentDidUpdate(prevProps) {
    if (!this.props.isValidated || this.props.rawValue !== prevProps.rawValue) {
      this.validate(this.props.rawValue, undefined);
    }
  }

  componentWillUnmount() {
    this.props.formkitForm.deregisterField(this);
    this.props.deregisterField();
  }  

  setElementRef(element) {
    this.elementRef = element;
  };

  handleChange(event) {
    const value = this.formatToStore(this.getTargetValue(event.target));
    this.validate(value, undefined, true);
    if (this.props.getNextCursorPosition) {
      const target = event.target;
      const previousPosition = target.selectionStart;
      const previousValue = this.props.formatFromStore(this.props.rawValue);
      this.setState({}, () => {
        const nextPosition = this.props.getNextCursorPosition(previousPosition, previousValue, this.props.formatFromStore(value));
        target.setSelectionRange(nextPosition, nextPosition);
      });
    }
  }

  showAnyErrors(event) {
    if (!this.props.touched) {
      if (this.props.error) {
        event.preventDefault();
      }
      this.props.setTouched(true);
    }
  }


  validate(rawValue, touchedPayload = {}, runOnChange = false) {
    let validateError;
    if (this.props.validate) {
      const fieldValues = this.props.formkitForm.getFormState().fieldValues;
      if (Array.isArray(this.props.validate)) {
        for (let i = 0; i < this.props.validate.length && !validateError; i++) {
          validateError = this.props.validate[i](rawValue, fieldValues);
        }
      } else {
        validateError = this.props.validate(rawValue, fieldValues);
      }
    }
    this.props.updateField(rawValue, validateError, touchedPayload);
    if (runOnChange && this.props.onChange) {
      this.setState({}, () => {
        this.props.onChange(this.props.formInterface);
      });
    }
  }


  render () {
    const props = this.props;
    const value = props.formatFromStore(props.rawValue); 
    const Component = props.component;
    const {
      component,
      updateField,
      formatFromStore,
      formatToStore,
      getNextCursorPosition,
      getTargetValue,
      useTargetCondition,
      deregisterField,
      setTouched,
      validate,
      onChange,
      rawValue,
      error,
      touched,
      ...givenProps
    } = props;
    if (typeof Component === 'string') {
      return <Component {...givenProps} ref={this.setElementRef} value={value} onChange={this.handleChange} onBlur={this.showAnyErrors}/>
    } else {
      return <Component {...givenProps} setElementRef={this.setElementRef} value={value} handleChange={this.handleChange} handleBlur={this.showAnyErrors} error={error} touched={touched}/>      
    }
  }
}

Field.propTypes = {
  formkitForm: PropTypes.object.isRequired,
  formInterface: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  rawValue: PropTypes.any,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element
  ]).isRequired,
  updateField: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired,
  deregisterField: PropTypes.func.isRequired,
  getTargetValue: PropTypes.func.isRequired,
  formatFromStore: PropTypes.func.isRequired,
  formatToStore: PropTypes.func.isRequired,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array
  ]),
  onChange: PropTypes.func,
  useTargetCondition: PropTypes.func,
  getNextCursorPosition: PropTypes.func
}

Field.defaultProps = {
  formatFromStore: (value = '') => value,
  formatToStore: value => value,
  getTargetValue: target => target.value
};


const mapStateToProps = (state, ownProps) => {
  const rawValue = getField(state.fieldValues, ownProps.name);
  const status = getField(state.fieldStatus, ownProps.name) || {};
  const touched = status.touched || !ownProps.validate;
  const error = status.error? status.error: getField(state.fieldErrors, ownProps.name);
  return {
    rawValue,
    error,
    touched,
    isValidated: status.isValidated === true
  };
};



const mapDispatchToProps = (dispatch, ownProps) => {
  const fieldName = ownProps.name;
  return {
    updateField: (value, error, touchedPayload = {}) => {
      dispatch(updateField(fieldName, value, error, touchedPayload, true));
    },
    setTouched: touched => {
      dispatch(setFieldTouched(fieldName, touched));
    },
    deregisterField: () => {
      dispatch(deregisterField(fieldName));
    }
  };
};

export default connectToFormkit(mapStateToProps, mapDispatchToProps)(Field);
