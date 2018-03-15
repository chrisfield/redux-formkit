import React, {Component} from 'react';
import { connect } from 'react-redux';
import {updateFields} from './actions/field';

const Formkit = (form, name, {initialValues, validate, submit}) => {

  class BaseForm extends Component {
    constructor(props) {
      super(props);
      this.fields = [];
      this.getField = this.getField.bind(this);
      this.registerField = this.registerField.bind(this);
      this.deregisterField = this.deregisterField.bind(this);      
      this.validate = this.validate.bind(this);
      this.submit = this.submit.bind(this);
      this.fieldValues = this.fieldValues.bind(this);
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

    fieldValues() {
      return this.props.fieldValues;
    }

    submit(event) {
      const isValid = this.validate();
      if (!isValid || submit) {
        event.preventDefault();
      }
      if (submit && isValid) {
        submit(this.props.fieldValues);
        if (initialValues) {
          this.props.updateFields(initialValues || {});
          //this.validateFields(this.fields, false)
        }        
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
      fieldValues: formState ? formState.value: {}
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      register: (form) => {console.log(`register form ${name}`);},
      deregister: (form) => {console.log(`deregister form ${name}`);},
      updateFields: (values) => {dispatch(updateFields(name, values))}
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(BaseForm);
};

export default Formkit;
