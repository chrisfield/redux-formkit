import React from 'react';
import connectToFormkit from './connect-to-formkit';
import {updateField, setFieldError, setFieldTouched, deregisterField} from './actions';
import getField from './state-utils/get-field';


class Field extends React.Component {

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
      validate: () => {this.validate(this.props.rawValue)}
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

  componentWillUnmount() {
    this.props.formkitForm.deregisterField(this);
    this.props.deregisterField();
  }

  setElementRef(element) {
    this.elementRef = element;
  };

  handleChange(event) {
    this.validate(this.formatToStore(this.getTargetValue(event.target)));
    if (this.props.onChange) {
      this.setState({}, () => {
        this.props.onChange(this.props.formInterface);
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


  validate(rawValue, touchedPayload = {}) {
    const fieldValues = this.props.formkitForm.getFormState().fieldValues;
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
    this.props.updateField(rawValue, validateError, touchedPayload);
    if (this.props.onChange && (rawValue !== this.props.rawValue)) {
      this.setState({}, () => {
        this.props.onChange(this.props.formInterface);
      });
    }
  }


  render () {
    const props = this.props;
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
  const fieldName = ownProps.name;
  return {
    updateField: (value, error, touchedPayload = {}) => {
      dispatch(updateField(fieldName, value, error, touchedPayload));
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
