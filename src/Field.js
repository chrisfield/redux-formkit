import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateField, setFieldError, registerField, deregisterField, incrementErrorCount} from './actions/field';
import getFormState from './selectors/getFormState';
import getFieldValue from './selectors/getFieldValue';

import PropTypes from 'prop-types';

class Field extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.validateValue = this.validateValue.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {;
    this.props.form.registerField(this);
    this.props.register(this.props.name);
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
    this.validateValue(this.getEventValue(event), true);  //todo: Simplify - Can probabaly just mark as touched
    if (this.props.onValidate) {
      this.props.onValidate(this.props.form);
    } 
  }

  getEventValue(event) {
    if (event.target.type === "checkbox") { // todo: refactor
      return event.target.checked;
    }
    if (this.props.format) {
      return this.props.format(event.target.value);
    }
    return event.target.value;
  }

  validateValue(value, touched) {
    const getFieldValues = this.props.form.fieldValues;
    const fieldValues = getFieldValues && getFieldValues();
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

  update(event) {
    this.props.updateValue(this.getEventValue(event));
    if (this.props.error) {  
      this.validate(event); // todo: refactor to 
    }
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
          onValidate,
          format,
          formatFromStore,
          updateValue,
          setError,
          incrementErrorCount,
          touched,
          value,
          error,
          ...givenProps
        } = this.props;
        return <Component onChange={this.update} onBlur={this.validate} value={this.getFormattedValue()} {...givenProps} />
      } else {
        return <Component {...this.props} value={this.getFormattedValue()} update={this.update} validate={this.validate} />
      }
    }
    
    return this.props.children({
      update: this.update,
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
  onValidate: PropTypes.func,
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
    value: getFieldValue(formState.value, ownProps.name),
    error: fieldStatus.error,
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
    incrementErrorCount: (amount) => {dispatch(incrementErrorCount(formName, amount))}
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);
