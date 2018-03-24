import React, {Component} from 'react';
import { connect } from 'react-redux';
import isPromise from 'is-promise'
import {updateFields, startSubmit, stopSubmit} from './actions/field';
import SubmissionError from './SubmissionError';

const Formkit = (form, name, {initialValues, validate, onSubmit, onSubmitSuccess}) => {

  class BaseForm extends Component {
    constructor(props) {
      super(props);
      this.fields = [];
      this.getField = this.getField.bind(this);
      this.registerField = this.registerField.bind(this);
      this.deregisterField = this.deregisterField.bind(this);      
      this.validate = this.validate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.name = name;
    }

    componentWillMount() {
      this.props.register();
      if (initialValues) {
        this.props.updateFields(initialValues);
      }
    }
    
    componentWillUnMount() {
      this.props.deregister();
    }
    
    registerField(field) {
      this.fields.push(field);
    }

    deregisterField(field) { 
      const index = this.fields.indexOf(field);
      if (index > -1) {
        this.fields.splice(index, 1);
      }
    }

    getField(name) {
      for (let i = 0; i < this.fields.length; i++) {
        if (this.fields[i].props.name === name) {
          return this.fields[i];
        }
      };
    }

    validate() {
      let isValid = true;
      if (validate) {
        isValid = validate(this.fieldValues());
      }
      return this.validateFields(this.fields) && isValid;
    }
    
    validateFields(fields, touched=true) {
      let isValid = true;
      for (let i=0; i<fields.length; i++) {
        if (fields[i].fields) {
          isValid = this.validateFields(fields[i].fields, touched) && isValid
        } else {
          const fieldProps = fields[i].props;
          let error;
          if (fieldProps.touched) {
            error = fieldProps.error;
          } else {
            error = fields[i].validateValue(fields[i].props.value, touched);
          }
          if (error) {
            isValid = false;
          }
        }
      }
      return isValid;
    }

    handleSubmit(event) {
      const isValid = this.validate();
      if (!isValid || onSubmit) {
        event.preventDefault();
      }
      if (onSubmit && isValid) {
        this.props.startSubmit();
        let result;
        try {
          result = onSubmit(this.props.fieldValues);
        } catch (submitError) {
          const errors =
            submitError instanceof SubmissionError
              ? submitError.errors
              : undefined
          this.props.stopSubmit(errors);
          if (!errors) {
            throw submitError
          }
          return;
        }
        if (!isPromise(result)) {
          this.props.stopSubmit();
          if (onSubmitSuccess) {
            onSubmitSuccess(this);
          }
          return;
        }
        return result.then(
          (submitResult) => {
            this.props.stopSubmit();
            if (onSubmitSuccess) {
              onSubmitSuccess(this);
            }
            return;
          },
          (submitError) => {
            const errors =
              submitError instanceof SubmissionError
                ? submitError.errors
                : undefined
            this.props.stopSubmit(errors)
            if (!errors) {
              throw submitError;
            }
          }
        );        
      }
    }

    render() {
      const TheForm = form;
      return <TheForm {...this.props} form={this}/>;
    }
  }

  function mapStateToProps(state, ownProps) {
    const formState = state.form[name];
    return {
      fieldValues: formState ? formState.values: {}
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      register: (form) => {console.log(`register form ${name}`);},
      deregister: (form) => {console.log(`deregister form ${name}`);},
      updateFields: (values) => {dispatch(updateFields(name, values))},
      startSubmit: () => {dispatch(startSubmit(name))},
      stopSubmit: (errors) => {dispatch(stopSubmit(name, errors))}
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(BaseForm);
};

export default Formkit;
