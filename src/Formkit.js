import React, {Component} from 'react';
import { connect } from 'react-redux';

const Formkit = (form, name, validator) => {

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


    componentDidMount() {
      this.props.register();
    }
    
    componentWillUnMount() {
      this.props.deregister();
    }

    shouldComponentUpdateOld(nextProps) {
      const {theFieldValues: a, ...next} = nextProps;
      const {theFieldValues: b, ...previous} = this.props;
      let nextKeyCount = 0;
      for(let key in next) {
        nextKeyCount += 1;
        if(next[key] !== previous[key]) {
          return true;
        }
      }
      return nextKeyCount === Object.keys(this.props).length;
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
      validator(this.fieldValues());
      return this.validateFields(this.fields);
    }
    
    validateFields(fields) {
      let isValid = true;
      for (let i=0; i<fields.length; i++) {

        if (fields[i].fields) {
          isValid = this.validateFields(fields[i].fields) && isValid
        } else {
          const fieldProps = fields[i].props;
          let error;
          if (fieldProps.touched) {
            error = fieldProps.error;
          } else {
            error = fields[i].validateValue(fields[i].props.value, true);
          }
          if (error) {
            isValid = false;
          }
        }
      }
      return isValid;
    }

    fieldValues() {
      return this.props.theFieldValues;
    }

    submit(event) {
      const isValid = this.validate();
      if (!isValid) {
        event.preventDefault();
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
      theFieldValues: formState ? formState.value: undefined
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      register: (form) => {console.log(`register form ${name}`);},
      deregister: (form) => {console.log(`deregister form ${name}`);}
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(BaseForm);
};

export default Formkit;
