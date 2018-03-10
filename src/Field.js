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
    this.validateValue(this.getEventValue(event), true);
    if (this.props.onValidate) {
      this.props.onValidate(this.props.form);
    } 
  }

  getEventValue(event) {
    if (event.target.type === "checkbox") {
      return event.target.checked;
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
      this.validate(event);
    }
  }

  render() {
    if (this.props.component) {
      const Component = this.props.component;
      if (typeof Component === 'string') {
        return <Component onChange={this.update} onBlur={this.validate} value={this.props.value} placeholder={this.props.placeholder}/>
      } else {
        return <Component {...this.props} update={this.update} validate={this.validate} />
      }
    }
    
    return this.props.children({
      update: this.update,
      validate: this.validate,
      value: this.props.value,
      error: this.props.error,
      touched: this.props.touched
    });
  }
}


Field.propTypes = {
  fieldContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  touched: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  deregister: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}


const mapStateToProps = (state, ownProps) => {
  const formState = getFormState(state, ownProps.form.name);
  const fieldStatus = getFieldValue(formState.status, ownProps.name) || {touched: false};

  return {
    value: getFieldValue(formState.value, ownProps.name) || "",  // todo prob needs a refactor
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
