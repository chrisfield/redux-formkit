import React, { useEffect, useRef, memo } from 'react';
import {deregisterField, updateField, setFieldError, setFieldTouched } from './actions';
import { useForm } from './form';
import useField from './use-field';

function usePrevious(value) {
  const ref = useRef({});
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
  beforeUpdate,
  formatFromStore,
  formatToStore,
  getTargetValue,
  useTargetCondition,
  validate,
  dispatch,
  value,
  error,
  touched,
  customProps,
  isResetFieldsDue,
  ...props
}) => {
  const elementRef = useRef();
  const fieldRef = useRef({
    name,
    error,
    setTouched: touched => dispatch(setFieldTouched(touched)),
    getInterface: () => fieldInterfaceRef.current
  });

  const formApi = useForm();
  useEffect(() => {
    formApi.registerField(fieldRef.current);
    return () => {
      dispatch(deregisterField());
      formApi.deregisterField(fieldRef.current);
    }
  }, []);

  const fieldInterfaceRef = useRef(); 
  useEffect(() => {
    fieldInterfaceRef.current = {
      name,
      getField: name => formApi.getField(name),
      element: elementRef.current,
      validate: () => {validateValue(value)},
      setTouched: fieldRef.current.setTouched,
      setValue: value => dispatch(updateField(value)),
      value,
      error,
      touched,
      customProps,
      isResetFieldsDue
    }
  });

  const isMountedRef = useRef(false);
  const previous = usePrevious({value, customProps});
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      if (elementRef.current) {
        if (!useTargetCondition || useTargetCondition(elementRef.current)) {
          const inputValue = formatToStore(getTargetValue(elementRef.current));
          validateValue(inputValue);
        }
      } else {
        validateValue(value);
      }
      return;
    }

    if (isResetFieldsDue || value !== previous.value && !twoInvalidNumbers(value, previous.value)) {
      validateValue(value);
    }

    if ((value !== previous.value && !twoInvalidNumbers(value, previous.value))
      || customProps !== previous.customProps) {
      afterUpdate(fieldInterfaceRef.current, customProps);
    }
  });
  
  const handleChange = (event) => {
    const nextValueToStore = formatToStore(getTargetValue(event.target, event));
    const nextCustomProps = beforeUpdate(
      fieldInterfaceRef.current,
      formatFromStore(value),
      formatFromStore(nextValueToStore)
    );
    dispatch(updateField(nextValueToStore, nextCustomProps));
  };

  const validateValue = (value) => {
    let validateError;
    if (validate) {
      const fieldValues = formApi.formReducerRef.current[0].fieldValues;
      if (Array.isArray(validate)) {
        for (let i = 0; i < validate.length && !validateError; i++) {
          validateError = validate[i](value, fieldValues, {...fieldInterfaceRef.current, ...props});
        }
      } else {
        validateError = validate(value, fieldValues, {...fieldInterfaceRef.current, ...props});
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
  && !nextProps.isResetFieldsDue
));

const noop = () => (undefined);
Field.defaultProps = {
  afterUpdate: noop,
  beforeUpdate: noop,
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