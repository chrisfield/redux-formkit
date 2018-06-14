import React from 'react';
import connectToFormkit from './connect-to-formkit';
import {updateField, setFieldError, setFieldTouched, incrementErrorCount, deregisterField} from './actions';
import getField from './state-utils/get-field';


class Field extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.setElementRef = this.setElementRef.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showAnyErrors = this.showAnyErrors.bind(this);
  }

  componentDidMount() {
    this.props.form.registerField(this);
    this.validate({touched: false});
  }

  componentWillUnmount() {
    this.props.form.deregisterField(this);
    this.props.deregisterField();
  }

  componentDidUpdate(prevProps) {
    if (this.props.rawValue !== prevProps.rawValue) {
      this.validate();
    }
  }

  setElementRef(element) {
    this.elementRef = element;
  };

  handleChange(event) {
    this.props.updateValue(event.target);
    if (this.props.onChange) {
      this.setState({}, () => {
        this.props.onChange(this.props.form);
      });
    }
    if (this.props.getNextCursorPosition) {
      const target = event.target;
      const previousPosition = target.selectionStart;
      const previousValue = this.props.value;
      this.setState({}, () => {
        const nextPosition = this.props.getNextCursorPosition(previousPosition, previousValue, this.props.value);
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

  validate(touchedPayload) {
    let rawValue = this.props.rawValue;
    let fieldValues = this.props.form.getFormState().fieldValues;
    let validateError;
    if (this.props.validate) {
      if (Array.isArray(this.props.validate)) {
        for (let i = 0; i < this.props.validate.length && !validateError; i++) {
          validateError = this.props.validate[i](rawValue, fieldValues);
        }
      } else {
        validateError = this.props.validate(rawValue, fieldValues);
      }
    }
    if (touchedPayload || (validateError !== this.props.error)) {
      this.props.setError(validateError, touchedPayload);
    }
  }


  render () {
    const props = this.props;
    const Component = props.component;
    const {
      component,
      updateValue,
      formatFromStore,
      formatToStore,
      getNextCursorPosition,
      getTargetValue,
      setError,
      deregisterField,
      setTouched,
      validate,
      onChange,
      rawValue,
      error,
      touched,
      showAnyErrors,
      ...givenProps
    } = props;
    if (typeof Component === 'string') {
      return <Component {...givenProps} ref={this.setElementRef} onChange={this.handleChange} onBlur={this.showAnyErrors}/>
    } else {
      return <Component {...givenProps} setElementRef={this.setElementRef} handleChange={this.handleChange} handleBlur={this.showAnyErrors} error={error} touched={touched}/>      
    }
  }
}

const defaultFormatFromStore = (value = '') => value;

const mapStateToProps = (state, ownProps) => {
  const formatFromStore = ownProps.formatFromStore || defaultFormatFromStore;
  const rawValue = getField(state.fieldValues, ownProps.name);
  const status = getField(state.fieldStatus, ownProps.name) || {};
  const touched = status.touched || !ownProps.validate;
  const error = status.error || getField(state.fieldErrors, ownProps.name);
  return {
    value: formatFromStore(rawValue),
    rawValue,
    error,
    touched
  };
};

const defaultFormatToStore = value => value;
const defaultGetTargetValue = target => target.value;

const mapDispatchToProps = (dispatch, ownProps) => {
  const formatToStore = ownProps.formatToStore || defaultFormatToStore;
  const getTargetValue = ownProps.getTargetValue || defaultGetTargetValue;
  const fieldName = ownProps.name;
  return {
    updateValue: target => {
      dispatch(updateField(fieldName, formatToStore(getTargetValue(target), ownProps)));
    },
    setError: (error, touchedPayload = {}) => {
      dispatch(setFieldError(fieldName, error, touchedPayload, ownProps.error));
    },
    setTouched: touched => {
      dispatch(setFieldTouched(fieldName, touched));
    },
    incrementErrorCount: (amount) => {
      dispatch(incrementErrorCount(amount, ownProps.name));
    },
    deregisterField: () => {
      dispatch(deregisterField(fieldName));
    }
  };
};

export default connectToFormkit(mapStateToProps, mapDispatchToProps)(Field);
