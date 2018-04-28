import React, {Component, createContext} from 'react';
import { connect } from 'react-redux';
import isPromise from 'is-promise'
import {updateFields, startSubmit, stopSubmit} from './actions/field';
import SubmissionError from './SubmissionError';
import getFormState from './selectors/getFormState';

export const FormContext = React.createContext();


const Formkit = ({name, initialValues, onSubmit, onSubmitSuccess}) => {
  return (form) => {

    class BaseForm extends Component {
      constructor(props) {
        super(props);
        this.fields = [];
        this.getField = this.getField.bind(this);
        this.registerField = this.registerField.bind(this);
        this.deregisterField = this.deregisterField.bind(this);      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.name = name;
      }

      componentWillMount() {
        if (initialValues) {
          this.props.updateFields(initialValues);
        }
      }

      componentDidMount() {
        const fields = this.fields;
        let elementToFocus;
        let elementWithFocus;
        for (let i = fields.length-1; i >= 0; i--) {
          const element = fields[i].element;
          if (element && element.focus) {
            elementToFocus = element;
            if (document.activeElement === element) {
              return;
            }
          }
        }
        if (elementToFocus) {
          elementToFocus.focus();
        }
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
        const fields = this.fields;
        let isValid = true;
        for (let i=0; i<fields.length; i++) {
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
        return isValid;
      }


      focusOnFieldWithError() {
        const fields = this.fields;
        for (let i=0; i<fields.length; i++) {
          if (fields[i].props.error) {
            const element = fields[i].element;
            if (element && element.focus) {
              element.focus();
            }
            if (element && element.scrollIntoView) {
              element.scrollIntoView();
            }
            break;
          } 
        }
      }

      handleSubmit(event) {
        const isValid = this.validate();
        if (!isValid) {
          this.focusOnFieldWithError();
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
            this.focusOnFieldWithError();
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
              this.focusOnFieldWithError();
            }
          );        
        }
      }

      render() {
        const TheForm = form;
        return (
          <FormContext.Provider value={this} >
            <TheForm {...this.props} form={this}/>
          </FormContext.Provider>

        );
      }
    }

    function mapStateToProps(state) {
      const formState = getFormState(state, name);
      return {
        fieldValues: formState.values
      };
    }

    function mapDispatchToProps(dispatch) {
      return {
        updateFields: (values) => {dispatch(updateFields(name, values))},
        startSubmit: () => {dispatch(startSubmit(name))},
        stopSubmit: (errors) => {dispatch(stopSubmit(name, errors))}
      };
    }

    return connect(mapStateToProps, mapDispatchToProps)(BaseForm);
  };
};


export default Formkit;
