import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateField, setFieldError, registerField, deregisterField, incrementErrorCount, touchField} from './actions/field';
import getFormState from './selectors/getFormState';
import getFieldValue from './selectors/getFieldValue';
import {FormContext} from './Formkit'; 

import PropTypes from 'prop-types';

class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.validate = this.validate.bind(this);
    this.revalidate = this.revalidate.bind(this);
    this.validateValue = this.validateValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setElementRef = this.setElementRef.bind(this);
  }

  componentDidMount() {
    this.props.form.registerField(this);
    this.props.register(this.props.name);
    if (this.element) {
      const actualValue = this.getElementValue(this.element, this.element.value);
      if (actualValue !== this.getFormattedValue()) {
        this.handleElementChange(this.element, this.element.value);
        this.validateValue(actualValue, true);
        return;
      }
    }
    this.validateValue(this.props.value, false);
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.validateValue(this.props.value);
    }
    let errorChange = 0;
    if (prevProps.error) {
      errorChange--;
    } 
    if (this.props.error) {
      errorChange++;
    }
    if (errorChange) {
      this.props.incrementErrorCount(errorChange);
    }
  }

  componentWillUnmount() {
    this.props.deregister(this.props.name);
    this.props.form.deregisterField(this);
    if (this.props.error) {
      this.props.incrementErrorCount(-1);
    }    
  }

  validate(event) {
    this.props.touchField(true);
    if (this.props.onChange) {
      this.props.onChange(this.props.form);
    } 
  }

  revalidate() {
    this.validateValue(this.props.value); 
  }

  getElementValue(element, value) {
    if (element.type === "checkbox") {
      return element.checked;
    }
    if (this.props.format) {
      return this.props.format(element.value);
    }
    return element.value;
  }

  validateValue(value, touched) {
    const fieldValues = this.props.form.props.fieldValues;
    let validateError;
    if (this.props.validate) {
      if (Array.isArray(this.props.validate)) {
        for (let i = 0; i < this.props.validate.length && !validateError; i++) {
          validateError = this.props.validate[i](value, fieldValues);
        }
      } else {
        validateError = this.props.validate(value, fieldValues);
      }
    }
    this.props.setError(validateError, touched);
    return validateError;
  }  

  handleChange(event) {
    this.handleElementChange(event.target, event.target.value);
  }

  handleElementChange(target, value) {
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const cursorIsAtEnd = start === value.length;
    this.props.updateValue(this.getElementValue(target, value));
    if (this.props.onChange) {
      this.props.onChange(this.props.form);
    }
    this.props.touchField(false);
    this.setState(this.state, () => {
      try {
        if (cursorIsAtEnd) {
          target.setSelectionRange(target.value.length, target.value.length);
        } else {
          target.setSelectionRange(start, end);
        }
      } catch(err) {
        if (err instanceof DOMException && err.name === "InvalidStateError") {
          // setSelectionRange does not apply
        } else {
          throw err;
        }
      }
    });
  }

  getFormattedValue() {
    if (this.props.formatFromStore) {
      return this.props.formatFromStore(this.props.value);
    }
    if (this.props.value === undefined) {
      return '';
    }
    return this.props.value;
  }


  setElementRef(element) {
    this.element = element;
  };


  render() {
    if (this.props.component) {
      const Component = this.props.component;
      if (typeof Component === 'string') {
        const {
          form,
          component,
          register,
          deregister,
          validate,
          onChange,
          format,
          formatFromStore,
          updateValue,
          touchField,
          setError,
          incrementErrorCount,
          touched,
          value,
          error,
          ...givenProps
        } = this.props;
        return <Component {...givenProps} onChange={this.handleChange} onBlur={this.validate} value={this.getFormattedValue()}  />
      } else {
        return <Component elementRef={this.setElementRef} {...this.props}  value={this.getFormattedValue()} update={this.handleChange} validate={this.validate} />
      }
    }
    
    return this.props.children({
      update: this.handleChange,
      validate: this.validate,
      value: this.getFormattedValue(),
      error: this.props.error,
      touched: this.props.touched
    });
  }
}


Field.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  register: PropTypes.func.isRequired,
  deregister: PropTypes.func.isRequired,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  format: PropTypes.func,
  formatFromStore: PropTypes.func,
  onChange: PropTypes.func,
  touchField: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  incrementErrorCount: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  touched: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}


const mapStateToProps = (state, ownProps) => {
  const formState = getFormState(state, ownProps.form.name);
  const fieldStatus = getFieldValue(formState.status, ownProps.name) || {touched: false};

  return {
    value: getFieldValue(formState.values, ownProps.name),
    error: fieldStatus.error || getFieldValue(formState.errors, ownProps.name),
    touched: fieldStatus.touched
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formName = ownProps.form.name;
  return {
    register: () => {dispatch(registerField(formName, ownProps.name))},
    deregister: () => {dispatch(deregisterField(formName, ownProps.name))},
    updateValue: (value) => {dispatch(updateField(formName, ownProps.name, value))},
    setError: (error, touched) => {dispatch(setFieldError(formName, ownProps.name, error, touched))},
    touchField: (touched) => {dispatch(touchField(formName, ownProps.name, touched))},
    incrementErrorCount: (amount) => {dispatch(incrementErrorCount(formName, amount))}
  }
};


const ConnectedField = connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);


export default React.forwardRef((props, ref) => (
  <FormContext.Consumer>
    {form => <ConnectedField {...props} form={form} ref={ref} />}
  </FormContext.Consumer>
));

