import * as React from 'react';
import * as PropTypes from 'prop-types';
import connectToFormkit from './connect-to-formkit';
import {updateField, setFieldError, setFieldTouched, deregisterField} from './actions';
import getField from './state-utils/get-field';

interface FieldProps {
  name: string,
  formkitForm: any,
  formInterface: any,
  component: any,
  updateField: any,
  formatFromStore: any,
  formatToStore: any,
  getNextCursorPosition: any,
  getTargetValue: any,
  useTargetCondition: any,
  deregisterField: any,
  setError: any,
  setTouched: any,
  validate: any,
  onChange: any,
  rawValue: any,
  error: any,
  touched: any,
  validateOnMount: any
}

class Field extends React.PureComponent<FieldProps> {

  static propTypes: any
  static defaultProps: any

  elementRef: any
  fieldInterface: any


  constructor(props) {
    super(props);
    this.state = {};
    this.setElementRef = this.setElementRef.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showAnyErrors = this.showAnyErrors.bind(this);

    this.fieldInterface = {
      validate: () => {
        this.validate(this.props.rawValue);
      }
    }
  }

  componentDidMount() {
    this.props.formkitForm.registerField(this);
    if (this.elementRef) {
      if (!this.props.useTargetCondition || this.props.useTargetCondition(this.elementRef)) {
        const rawValue = this.props.formatToStore(this.props.getTargetValue(this.elementRef));
        if (this.props.validateOnMount || rawValue !== this.props.rawValue) {
          this.validate(rawValue);
        }
      }        
    } else {
      if (this.props.validateOnMount) {
        this.validate(this.props.rawValue);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.rawValue !== prevProps.rawValue) {
      this.validate(this.props.rawValue);
      if (this.props.onChange) {
        this.setState({}, () => {
          this.props.onChange(this.props.formInterface);
        });
      } 
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
    const value = this.props.formatToStore(this.props.getTargetValue(event.target, event));
    this.props.updateField(value);
  }

  showAnyErrors(event) {
    if (!this.props.touched) {
      if (this.props.error) {
        event.preventDefault();
      }
      this.props.setTouched(true);
    }
  }


  validate(rawValue) {
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
    this.props.setError(validateError, rawValue);
  }


  render () {
    const props = this.props;
    const value = props.formatFromStore(props.rawValue); 
    const Component = props.component;
    const {
      formkitForm,
      formInterface,
      component,
      updateField,
      formatFromStore,
      formatToStore,
      getNextCursorPosition,
      getTargetValue,
      useTargetCondition,
      deregisterField,
      setError,
      setTouched,
      validate,
      onChange,
      rawValue,
      error,
      touched,
      validateOnMount,
      ...givenProps
    } = props;
    if (typeof Component === 'string') {
      const props = {
        ...givenProps,
        ref: this.setElementRef,
        value,
        onChange: this.handleChange,
        onBlur: this.showAnyErrors
      }
      return React.createElement(Component, props)
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
  setError: PropTypes.func.isRequired,
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
  getTargetValue: (target, value) => {
    if (target) {
      return target.value
    } else {
      return value
    }
  },
  validateOnMount: true
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
    validateOnMount: status.validateOnMount
  };
};



const mapDispatchToProps = (dispatch, ownProps) => {
  const fieldName = ownProps.name;
  return {
    updateField: (value) => {
      dispatch(updateField(fieldName, value));
    },
    setTouched: touched => {
      dispatch(setFieldTouched(fieldName, touched));
    },
    setError: (error, value) => {
      dispatch(setFieldError(fieldName, error, value));
    },
    deregisterField: () => {
      dispatch(deregisterField(fieldName));
    }
  };
};

export default connectToFormkit(mapStateToProps, mapDispatchToProps)(Field);
