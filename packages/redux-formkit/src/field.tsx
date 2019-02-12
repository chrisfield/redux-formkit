import * as PropTypes from "prop-types";
import * as React from "react";
import {deregisterField, setFieldError, setFieldTouched, updateField} from "./actions";
import connectToFormkit from "./connect-to-formkit";
import getField from "./state-utils/get-field";

interface FieldProps {
  afterUpdate: any;
  beforeUpdate: any;
  name: string;
  formkitForm: any;
  formInterface: any;
  component: any;
  updateField: any;
  formatFromStore: any;
  formatToStore: any;
  getNextCursorPosition: any;
  getTargetValue: any;
  useTargetCondition: any;
  deregisterField: any;
  setError: any;
  setTouched: any;
  status: any;
  validate: any;
  onChange: any;
  rawValue: any;
  error: any;
  touched: any;
  isPrevalidatedOnServer: boolean;
}

class Field extends React.PureComponent<FieldProps> {

  public static propTypes: any;
  public static defaultProps: any;

  public props: any;
  public state: any;
  public setState: any;
  public elementRef: any;
  public fieldInterface: any;

  constructor(props) {
    super(props);
    this.state = {};
    this.setElementRef = this.setElementRef.bind(this);
    this.validate = this.validate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showAnyErrors = this.showAnyErrors.bind(this);

    this.fieldInterface = {
      validate: () => {
        this.validate(this.props.rawValue);
      },
    };
  }

  public componentDidMount() {
    this.props.formkitForm.registerField(this);
    if (this.elementRef) {
      if (!this.props.useTargetCondition || this.props.useTargetCondition(this.elementRef)) {
        const rawValue = this.props.formatToStore(this.props.getTargetValue(this.elementRef));
        if (!this.props.isPrevalidatedOnServer || rawValue !== this.props.rawValue) {
          this.validate(rawValue);
        }
      }
    } else {
      if (!this.props.isPrevalidatedOnServer) {
        this.validate(this.props.rawValue);
      }
    }
  }

  public componentDidUpdate(prevProps) {
    if (typeof this.props.rawValue === "number"
      && isNaN(this.props.rawValue)
      && isNaN(prevProps.rawValue)
    ) {
      return;
    }

    if (this.props.rawValue !== prevProps.rawValue) {
      this.validate(this.props.rawValue);
      if (this.props.onChange) {
        this.setState({}, () => {
          this.props.onChange(this.props.formInterface);
        });
      }
    }
    if (this.elementRef) {
      this.props.afterUpdate(this.elementRef, this.props.status.customProps || {});
    }
  }

  public componentWillUnmount() {
    this.props.formkitForm.deregisterField(this);
    this.props.deregisterField();
  }

  public setElementRef(element) {
    this.elementRef = element;
  }

  public handleChange(event) {
    const props = this.props;
    const value = props.formatToStore(props.getTargetValue(event.target, event));
    let customProps = {};
    if (this.elementRef) {
      customProps = props.beforeUpdate(
        this.elementRef,
        props.formatFromStore(props.rawValue),
        props.formatFromStore(value),
      );
    }
    props.updateField(value, customProps);
  }

  public showAnyErrors(event) {
    if (!this.props.touched) {
      if (this.props.error) {
        event.preventDefault();
      }
      this.props.setTouched(true);
    }
  }

  public validate(rawValue) {
    let validateError;
    if (this.props.validate) {
      const fieldValues = this.props.formkitForm.getFormState().fieldValues;
      if (Array.isArray(this.props.validate)) {
        for (let i = 0; i < this.props.validate.length && !validateError; i++) {
          validateError = this.props.validate[i](rawValue, fieldValues);
        }
      } else {
        validateError = this.props.validate(rawValue, fieldValues);
      }
    }
    this.props.setError(validateError, rawValue);
  }

  public render() {
    const props = this.props;
    const value = props.formatFromStore(props.rawValue);
    const Component = props.component;
    const {
      afterUpdate,
      beforeUpdate,
      formkitForm,
      formInterface,
      component,
      updateField: updField,
      formatFromStore,
      formatToStore,
      getNextCursorPosition,
      getTargetValue,
      useTargetCondition,
      deregisterField: deregField,
      setError,
      setTouched,
      validate,
      onChange,
      rawValue,
      error,
      touched,
      isPrevalidatedOnServer,
      ...givenProps
    } = props;
    if (typeof Component === "string") {
      const propsForHtmlElement = {
        ...givenProps,
        onBlur: this.showAnyErrors,
        onChange: this.handleChange,
        ref: this.setElementRef,
        value,
      };
      return React.createElement(Component, propsForHtmlElement);
    } else {
      return (
        <Component
          {...givenProps}
          setElementRef={this.setElementRef}
          value={value}
          handleChange={this.handleChange}
          handleBlur={this.showAnyErrors}
          error={error}
          touched={touched}
        />
      );
    }
  }
}

Field.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  deregisterField: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  formInterface: PropTypes.object.isRequired,
  formatFromStore: PropTypes.func.isRequired,
  formatToStore: PropTypes.func.isRequired,
  formkitForm: PropTypes.object.isRequired,
  getNextCursorPosition: PropTypes.func,
  getTargetValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  rawValue: PropTypes.any,
  setError: PropTypes.func.isRequired,
  setTouched: PropTypes.func.isRequired,
  touched: PropTypes.bool.isRequired,
  updateField: PropTypes.func.isRequired,
  useTargetCondition: PropTypes.func,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
  ]),
};

Field.defaultProps = {
  afterUpdate: () => (undefined),
  beforeUpdate: () => ({}),
  formatFromStore: (value = "") => value,
  formatToStore: (value) => value,
  getTargetValue: (target, value) => {
    if (target) {
      return target.value;
    } else {
      return value;
    }
  },
  isPrevalidatedOnServer: false,
};

const mapStateToProps = (state, ownProps) => {
  const rawValue = getField(state.fieldValues, ownProps.name);
  const status = getField(state.fieldStatus, ownProps.name) || {};
  const touched = status.touched || !ownProps.validate;
  const error = status.error ? status.error : getField(state.formErrors, ownProps.name);
  return {
    error,
    isPrevalidatedOnServer: state.formStatus.isPrevalidatedOnServer,
    rawValue,
    status,
    touched,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const fieldName = ownProps.name;
  return {
    deregisterField: () => {
      dispatch(deregisterField(fieldName));
    },
    setError: (error, value) => {
      dispatch(setFieldError(fieldName, error, value));
    },
    setTouched: (touched) => {
      dispatch(setFieldTouched(fieldName, touched));
    },
    updateField: (value, customProps) => {
      dispatch(updateField(fieldName, value, customProps));
    },
  };
};

export default connectToFormkit(mapStateToProps, mapDispatchToProps)(Field);
