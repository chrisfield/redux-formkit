import React, { useEffect, useRef, memo } from 'react';
import {deregisterField, updateField, setFieldError, setFieldTouched } from './actions';
import { useForm } from './form';
import useField from './use-field';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function twoInvalidNumbers(x, y) {
  return typeof x === "number" && isNaN(x) && isNaN(y);
}

const FieldComponent = ({component, ...props}) => {
  if (typeof component === "string") {
    const {
      handleBlur,
      handleChange,
      touched,
      error,
      elementRef,
      ...givenProps} = props;
    return React.createElement(
      component,
      {onBlur: handleBlur, onChange: handleChange, ref: elementRef, ...givenProps}
    );
  } else {
    const Component = component;
    return <Component {...props}/>;  
  }
}

const Field = ({name, ...props}) => {
  const connectionProps = useField(name);
  return (
    <FieldBase
      name={name}
      {...props}
      {...connectionProps}
    />
  );
};

const FieldBase = memo(({
  name,
  afterUpdate,
  formatFromStore,
  formatToStore,
  getTargetValue,
  validate,
  dispatch,
  value,
  error,
  touched,
  customProps,
  formState,
  ...props
}) => {
  
  const elementRef = useRef();
  const fieldApiRef = useRef({
    name,
    elementRef
  });

  useEffect(() => {
    fieldApiRef.current.value = value;
    fieldApiRef.current.error = error;
    fieldApiRef.current.touched = touched;
    fieldApiRef.current.customProps = customProps;
    fieldApiRef.current.validate = () => validateValue(value);
    fieldApiRef.current.setTouched = (touched) => dispatch(setFieldTouched(touched));    
  });

  const formApi = useForm();
  useEffect(() => {
    formApi.registerField(fieldApiRef.current);
    return () => {
      dispatch(deregisterField());
      formApi.deregisterField(fieldApiRef.current);
    }
  }, []);

  const isMountedRef = useRef(false);
  const previousValue = usePrevious(value);
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      if (elementRef.current) {
        const inputValue = formatToStore(getTargetValue(elementRef.current));
        validateValue(inputValue);
      } else {
        validateValue(value);
      }
      return;
    }

    if (value !== previousValue && !twoInvalidNumbers(value, previousValue)) {
      validateValue(value);
    }

    if ((value !== previousValue && !twoInvalidNumbers(value, previousValue))
      || Object.keys(customProps).length > 0) {
      afterUpdate(fieldApiRef.current);
    }
  });
  
  const handleChange = (event) => {
    const valueToStore = formatToStore(getTargetValue(event.target, event));
    dispatch(updateField(valueToStore, customProps));
  };

  const validateValue = (value) => {
    let validateError;
    if (validate) {
      const fieldValues = formState.fieldValues;
      if (Array.isArray(validate)) {
        for (let i = 0; i < validate.length && !validateError; i++) {
          validateError = validate[i](value, fieldValues);
        }
      } else {
        validateError = validate(value, fieldValues);
      }
    }
    dispatch(setFieldError(validateError, value));
  };

  const showAnyErrors = (event) => {
    if (!touched) {
      if (error) {
        event.preventDefault();
      }
      dispatch(setFieldTouched(true));
    }
  };

  return (
    <FieldComponent
      elementRef={elementRef}
      handleChange={handleChange}
      handleBlur={showAnyErrors}
      name={name}
      value={formatFromStore(value)}
      touched={touched}
      error={error}
      {...props}
    />
  );
}, (prevProps, nextProps)=>(
  (prevProps.value === nextProps.value || twoInvalidNumbers(prevProps.value, nextProps.value))
  && prevProps.touched === nextProps.touched
  && prevProps.error === nextProps.error
  && prevProps.customProps === nextProps.customProps
));

Field.defaultProps = {
  afterUpdate: () => (undefined),
  formatFromStore: (value = "") => value,
  formatToStore: (value) => value,
  getTargetValue: (target, value) => {
    if (target) {
      return target.value;
    } else {
      return value;
    }
  }
};

export default Field;