import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import isPromise from 'is-promise';
import FormkitContext from './formkit-context';
import {startSubmit, stopSubmit, updateFields, resetFieldsIsDone} from './actions';
import SubmissionError from './submission-error';

interface FormkitConfig {
  connect: any
  name: string, 
  initialValues: object, 
  onSubmit: any,
  onSubmitSuccess: any,
  getFormState: any
}

interface FormInterface {
  handleSubmit: any,
  updateFields: any,
  getField: any,
  getFieldArray: any,
  getFormState: any
}

interface FormkitInterface {
  name: string,
  dispatch: any,
  getFormState: any,
  registerField: any,
  deregisterField: any,
  registerFieldArray: any,
  deregisterFieldArray: any,
  getField: any,
  getFieldArray: any
}

interface FormkitFormProps {
  dispatch: any,
  formState: any
}

interface FormkitFormState {
  isInitialized: boolean
}

const defaultGetFormState = state => state.form;

const Formkit = ({
  connect, 
  name, 
  initialValues, 
  onSubmit,
  onSubmitSuccess = noop, 
  getFormState = defaultGetFormState
}: FormkitConfig) => {
  return Form => {
    class FormkitForm extends PureComponent<FormkitFormProps, FormkitFormState> {

      static propTypes = {
        dispatch: PropTypes.func.isRequired,
        formState: PropTypes.object
      }

      formInterface: FormInterface
      formkitInterface: FormkitInterface
      fields: any
      fieldArrays: any

      constructor(props) {
        super(props); 
        this.state = {isInitialized: this.props.formState !== undefined};
        this.fields = [];
        this.fieldArrays = [];
        this.registerField = this.registerField.bind(this);
        this.deregisterField = this.deregisterField.bind(this);
        this.registerFieldArray = this.registerFieldArray.bind(this);
        this.deregisterFieldArray = this.deregisterFieldArray.bind(this);
        this.getField = this.getField.bind(this);
        this.getFieldArray = this.getFieldArray.bind(this);
        this.getFieldInterface = this.getFieldInterface.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateFields = this.updateFields.bind(this);
        this.getFormState = this.getFormState.bind(this);

        this.formkitInterface = {
          name,
          dispatch: this.props.dispatch,
          getFormState: this.getFormState,
          registerField: this.registerField,
          deregisterField: this.deregisterField,
          registerFieldArray: this.registerFieldArray,
          deregisterFieldArray: this.deregisterFieldArray,
          getField: this.getField,
          getFieldArray: this.getFieldArray
        };

        this.formInterface = {
          handleSubmit: this.handleSubmit,
          updateFields: this.updateFields,
          getField: this.getFieldInterface,
          getFieldArray: this.getFieldArray,
          getFormState: this.getFormState
        };

      }

      componentDidMount() {
        if (initialValues) {
          this.updateFields(initialValues);
        } else if (!this.props.formState) {
          this.updateFields({});
        } else if (this.props.formState.formStatus.isPrevalidatedOnServer) {
          this.props.dispatch(resetFieldsIsDone());
        }
        this.setState({isInitialized: true});
      }

      componentDidUpdate() {
        if (this.props.formState.formStatus.isResetFieldsDue) {
          this.markAllFieldsAsTouched(false);
          this.props.dispatch(resetFieldsIsDone());
        }
      }
        

      getFormState() {
        return this.props.formState;
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

      registerFieldArray(fieldArray) {
        this.fieldArrays.push(fieldArray);
      }

      deregisterFieldArray(fieldArray) { 
        const index = this.fieldArrays.indexOf(fieldArray);
        if (index > -1) {
          this.fieldArrays.splice(index, 1);
        }
      }

      markAllFieldsAsTouched(touched=true) {
        this.fields.forEach(field => {
          field.props.setTouched(touched);
        });
      }

      getField(name) {
        for (let i = 0; i < this.fields.length; i++) {
          if (this.fields[i].props.name === name) {
            return this.fields[i];
          }
        };
      }

      getFieldArray(name) {
        for (let i = 0; i < this.fieldArrays.length; i++) {
          if (this.fieldArrays[i].props.name === name) {
            return this.fieldArrays[i];
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
        const formState = this.props.formState;
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
        const {formState, dispatch, ...otherProps} = this.props;
        return (
          <FormkitContext.Provider value={{formkitForm: this.formkitInterface, formInterface: this.formInterface, formState}}>
            <Form {...otherProps} form={this.formInterface}/>
          </FormkitContext.Provider>    
        );
      }
    }

    function mapStateToProps(state) {
      return {formState: getFormState(state)[name]};
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
};

const noop = () => {};

export default Formkit;
