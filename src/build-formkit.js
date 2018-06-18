import React, {PureComponent} from 'react';
import isPromise from 'is-promise';
import FormkitContext from './formkit-context';
import {startSubmit, stopSubmit, updateFields} from './actions';
import SubmissionError from './submission-error';
import getField from './state-utils/get-field';
import isField from './state-utils/is-field';


const defaultGetFormState = state => state.form;

const buildFormkit = (connect) => (
  ({name, initialValues, onSubmit, onSubmitSuccess = noop, getFormState = defaultGetFormState}) => {
    return Form => {
      class FormkitForm extends PureComponent {
        constructor(props) {
          super(props); 
          this.state = {isInitialized: this.props.formkitState !== undefined}
          this.fields = [];
          this.registerField = this.registerField.bind(this);
          this.deregisterField = this.deregisterField.bind(this);
          this.getField = this.getField.bind(this);
          this.getFieldInterface = this.getFieldInterface.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.updateFields = this.updateFields.bind(this);
          this.getFormState = this.getFormState.bind(this);

          this.formkitForm = {
            name,
            dispatch: this.props.dispatch,
            getFormState: this.getFormState,
            registerField: this.registerField,
            deregisterField: this.registerField,
            getField: this.getField
          };

          this.formInterface = {
            handleSubmit: this.handleSubmit,
            updateFields: this.updateFields,
            getField: this.getFieldInterface,
            getFormState: this.getFormState
          };
  
        }

        componentDidMount() {
          if (initialValues) {
            this.updateFields(initialValues);
          } else if (!this.props.formkitState) {
            this.updateFields({});
          }
          this.setState({isInitialized: true});
        }

        getFormState() {
          return this.props.formkitState;
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
  
        markAllFieldsAsTouched() {
          this.fields.forEach(field => {
            field.props.setTouched(true);
          });
        }
  
        getField(name) {
          for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].props.name === name) {
              return this.fields[i];
            }
          };
        }

        getFieldInterface(name) {
          for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].props.name === name) {
              return this.fields[i].fieldInterface;
            }
          };
        }
  
        updateFields(values) {
          this.props.dispatch(updateFields(values))
          this.fields.forEach(field => {
            const fieldValueInObject = isField(values, field.props.name);
            if (fieldValueInObject) {
              field.validate(fieldValueInObject.value, {touched: false});
            }
          });
        }
  
        focusOnFieldWithError() {
          const fields = this.fields;
          for (let i=0; i<fields.length; i++) {
            if (fields[i].props.error) {
              const element = fields[i].elementRef;
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
          this.markAllFieldsAsTouched();
          const formState = this.props.formkitState;
          if (!formState.formStatus.isValid) {
            event.preventDefault();
            this.focusOnFieldWithError();
            return;
          }
          if (onSubmit) {
            event.preventDefault();
            let submitResult;
            this.props.dispatch(startSubmit());
            try {
              submitResult = onSubmit(formState.fieldValues);
            } catch (submitError) {
              this.props.dispatch(stopSubmit(submitError.errors));
              if (submitError instanceof SubmissionError) {
                this.focusOnFieldWithError();
                return;
              }
              throw submitError;
            }
  
            if (!isPromise(submitResult)) {
              this.props.dispatch(stopSubmit());
              onSubmitSuccess(this.formInterface);
              return;
            }
            return submitResult.then(
              () => {
                this.props.dispatch(stopSubmit());
                onSubmitSuccess(this.formInterface);
                return;
              },
              (asyncError) => {
                this.props.dispatch(stopSubmit(asyncError.errors));
                if (asyncError instanceof SubmissionError) {
                  this.focusOnFieldWithError();
                  return;
                }
                throw asyncError;
              }
            );        
  
          }
        }

        render() {
          if (!this.state.isInitialized) {
            return null;
          }
          const formState = this.getFormState();
          return (
            <FormkitContext.Provider value={{formkitForm: this.formkitForm, formInterface: this.formInterface, formState}}>
              <Form {...this.props} form={this.formInterface}/>
            </FormkitContext.Provider>    
          );
        }
      }

      function mapStateToProps(state) {
        return {formkitState: getFormState(state)[name]};
      }

      function mapDispatchToProps(dispatch) {
        return {
          dispatch: action => {
            dispatch({...action, form: name})
          }
        };
      }

      return connect(mapStateToProps, mapDispatchToProps)(FormkitForm);
    };
  }
);

const noop = () => {};

export default buildFormkit;
