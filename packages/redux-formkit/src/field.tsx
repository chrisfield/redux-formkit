import React, { useEffect, useRef, memo } from 'react';
import {deregisterField, updateField, setFieldError, setFieldTouched } from './actions';
import { useForm } from './form';
import useField from './use-field';

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function twoInvalidNumbers(x: any, y: any): boolean {
  return typeof x === "number" && isNaN(x) && isNaN(y);
}

const FieldComponent = ({component, ...props}: any): any => {
  if (typeof component === "string") {
    const {handleBlur, handleChange, elementRef, fieldApi, ...givenProps} = props;
    return React.createElement(
      component,
      {onBlur: handleBlur, onChange: handleChange, ref: elementRef, ...givenProps}
    );
  } else {
    const Component = component;
    return <Component {...props}/>;  
  }
}

const Field = ({name, ...props}: any) => {
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
  beforeUpdate,
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
}: any) => {

  console.log(`render Field, ${name}`);
  
  const elementRef = useRef();
  const fieldApiRef: any = useRef({
    name,
    elementRef
  });

  useEffect(() => {
    fieldApiRef.current.value = value;
    fieldApiRef.current.error = error;
    fieldApiRef.current.touched = touched;
    fieldApiRef.current.customProps = customProps;
    fieldApiRef.current.validate = () => validateValue(value);
    fieldApiRef.current.setTouched = (touched:boolean) => dispatch(setFieldTouched(touched));    
  });

  const formApi = useForm();
  useEffect(() => {
    formApi.registerField(fieldApiRef.current);
    return () => {
      console.log('dereg', name)
      dispatch(deregisterField());
      formApi.deregisterField(fieldApiRef.current);
    }
  }, []);

  const isMountedRef = useRef(false);
  const previousValue: any = usePrevious(value);
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
  
  const handleChange = (event: any) => {
    const valueToStore = formatToStore(getTargetValue(event.target, event));
    const customProps = beforeUpdate(
      fieldApiRef.current,
      formatFromStore(fieldApiRef.current.value),
      formatFromStore(valueToStore),
    );
    dispatch(updateField(valueToStore, customProps));
  };

  const validateValue = (value: any) => {
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

  const showAnyErrors = (event: any) => {
    if (!touched) {
      if (error) {
        event.preventDefault();
      }
      dispatch(setFieldTouched(true));
    }
  };

  return (
    <FieldComponent
      fieldApi={fieldApiRef.current}
      touched={fieldApiRef.current.touched}
      error={fieldApiRef.current.error}
      elementRef={elementRef}
      handleChange={handleChange}
      handleBlur={showAnyErrors}
      name={name}
      value={formatFromStore(value)}
      {...props}
    />
  );
}, (prevProps, nextProps)=>(
  prevProps.value === nextProps.value
  && prevProps.touched === nextProps.touched
  && prevProps.error === nextProps.error
  && prevProps.customProps === nextProps.customProps
));

Field.defaultProps = {
  afterUpdate: () => (undefined),
  beforeUpdate: () => ({}),
  formatFromStore: (value: any = "") => value,
  formatToStore: (value: any) => value,
  getTargetValue: (target: any, value: any) => {
    if (target) {
      return target.value;
    } else {
      return value;
    }
  }
//  isPrevalidatedOnServer: false,
};

export default Field;