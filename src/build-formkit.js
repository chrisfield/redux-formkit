import React, {PureComponent} from 'react';
import isPromise from 'is-promise';
import FormkitContext from './formkit-context';
import reducer from './reducers';
import {initFormState, startSubmit, stopSubmit, updateFields} from './actions';
import SubmissionError from './submission-error';


const defaultGetFormState = state => state.form;

const buildFormkit = (connect) => (
  ({name, initialValues, onSubmit, onSubmitSuccess = noop, getFormState = defaultGetFormState}) => {
    const initialState = reducer(undefined, initFormState(name))[name];
    return Form => {
      class FormkitForm extends PureComponent {
        constructor(props) {
          super(props);
          this.fields = [];
          this.registerField = this.registerField.bind(this);
          this.deregisterField = this.deregisterField.bind(this);
          this.getField = this.getField.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.updateFields = this.updateFields.bind(this);
          this.getFormState = this.getFormState.bind(this);

          this.formContext = {
            name,
            dispatch: this.props.dispatch,
            getFormState: this.getFormState,
            registerField: this.registerField,
            deregisterField: this.registerField,
            getField: this.getField
          };

          this.form = {
            handleSubmit: this.handleSubmit,
            updateFields: this.updateFields,
            getField: this.getField,
            getFormState: this.getFormState
          };
  
        }

        componentDidMount() {
          if (initialValues) {
            this.updateFields({...this.props.formkitState, ...initialValues});
          }
        }

        getFormState() {
          return this.props.formkitState? this.props.formkitState: initialState;
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
          this.fields.forEach(({props: field}) => {
            if (!field.touched) {
              field.setTouched(true);
            }
          });
        }
  
        getField(name) {
          for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].props.name === name) {
              return this.fields[i];
            }
          };
        }
  
        updateFields(values) {
          this.props.dispatch(updateFields(values));
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
              onSubmitSuccess(this.form);
              return;
            }
            return submitResult.then(
              () => {
                this.props.dispatch(stopSubmit());
                onSubmitSuccess(this.form);
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
          const formState = this.getFormState();
          return (
            <FormkitContext.Provider value={{formContext: this.formContext, formState}}>
              <Form {...this.props} form={this.form}/>
            </FormkitContext.Provider>    
          );
        }
      }

      function mapStateToProps(state) {
        return {
          formkitState: getFormState(state)[name]
        };
      }

      function mapDispatchToProps(dispatch) {
        return {
          dispatch: action => {
            console.log('dispatching', action);
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
