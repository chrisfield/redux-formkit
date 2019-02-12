import isPromise from "is-promise";
import * as PropTypes from "prop-types";
import * as React from "react";
import { PureComponent } from "react";
import {resetFieldsIsDone, startSubmit, stopSubmit, updateFields} from "./actions";
import FormkitContext from "./formkit-context";
import SubmissionError from "./submission-error";

interface FormkitConfig {
  connect: any;
  name: string;
  initialValues: object;
  onSubmit: any;
  onSubmitSuccess: any;
  getFormState: any;
}

interface FormInterface {
  handleSubmit: any;
  updateFields: any;
  getField: any;
  getFieldArray: any;
  getFormState: any;
}

interface FormkitInterface {
  name: string;
  dispatch: any;
  getFormState: any;
  registerField: any;
  deregisterField: any;
  registerFieldArray: any;
  deregisterFieldArray: any;
  getField: any;
  getFieldArray: any;
}

interface FormkitFormProps {
  dispatch: any;
  formState: any;
}

interface FormkitFormState {
  isInitialized: boolean;
}

const defaultGetFormState = (state) => state.form;

const Formkit = ({
  connect,
  name,
  initialValues,
  onSubmit,
  onSubmitSuccess = noop,
  getFormState = defaultGetFormState,
}: FormkitConfig) => {
  return (Form) => {
    class FormkitForm extends PureComponent<FormkitFormProps, FormkitFormState> {

      public static propTypes = {
        dispatch: PropTypes.func.isRequired,
        formState: PropTypes.object,
      };

      public formInterface: FormInterface;
      public formkitInterface: FormkitInterface;
      public fields: any;
      public fieldArrays: any;

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
          deregisterField: this.deregisterField,
          deregisterFieldArray: this.deregisterFieldArray,
          dispatch: this.props.dispatch,
          getField: this.getField,
          getFieldArray: this.getFieldArray,
          getFormState: this.getFormState,
          name,
          registerField: this.registerField,
          registerFieldArray: this.registerFieldArray,
        };

        this.formInterface = {
          getField: this.getFieldInterface,
          getFieldArray: this.getFieldArray,
          getFormState: this.getFormState,
          handleSubmit: this.handleSubmit,
          updateFields: this.updateFields,
        };

      }

      public componentDidMount() {
        if (initialValues) {
          this.updateFields(initialValues);
        } else if (!this.props.formState) {
          this.updateFields({});
        } else if (this.props.formState.formStatus.isPrevalidatedOnServer) {
          this.props.dispatch(resetFieldsIsDone());
        }
        this.setState({isInitialized: true});
      }

      public componentDidUpdate() {
        if (this.props.formState.formStatus.isResetFieldsDue) {
          this.markAllFieldsAsTouched(false);
          this.props.dispatch(resetFieldsIsDone());
        }
      }

      public getFormState() {
        return this.props.formState;
      }

      public registerField(field) {
        this.fields.push(field);
      }

      public deregisterField(field) {
        const index = this.fields.indexOf(field);
        if (index > -1) {
          this.fields.splice(index, 1);
        }
      }

      public registerFieldArray(fieldArray) {
        this.fieldArrays.push(fieldArray);
      }

      public deregisterFieldArray(fieldArray) {
        const index = this.fieldArrays.indexOf(fieldArray);
        if (index > -1) {
          this.fieldArrays.splice(index, 1);
        }
      }

      public markAllFieldsAsTouched(touched= true) {
        this.fields.forEach((field) => {
          field.props.setTouched(touched);
        });
      }

      public getField(fieldName) {
        for (const field of this.fields) {
          if (field.props.name === fieldName) {
            return field;
          }
        }
      }

      public getFieldArray(fieldArrayName) {
        for (const fieldArray of this.fieldArrays) {
          if (fieldArray.props.name === fieldArrayName) {
            return fieldArray;
          }
        }
      }

      public getFieldInterface(fieldName) {
        for (const field of this.fields) {
          if (field.props.name === fieldName) {
            return field.getFieldInterface();
          }
        }
      }

      public updateFields(values) {
        this.props.dispatch(updateFields(values));
      }

      public focusOnFieldWithError() {
        for (const field of this.fields) {
          if (field.props.error) {
            const element = field.elementRef;
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

      public handleSubmit(event) {
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
            },
          );

        }
      }

      public render() {
        if (!this.state.isInitialized) {
          return null;
        }
        const {formState, dispatch, ...otherProps} = this.props;
        return (
          <FormkitContext.Provider
            value={{formkitForm: this.formkitInterface, formInterface: this.formInterface, formState}}
          >
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
        dispatch: (action) => {
          dispatch({...action, form: name});
        },
      };
    }

    return connect(mapStateToProps, mapDispatchToProps)(FormkitForm);
  };
};

const noop = () => undefined;

export default Formkit;
