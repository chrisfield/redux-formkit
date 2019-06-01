import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import isPromise from "is-promise";
import SubmissionError from "./submission-error";
import { startSubmit, stopSubmit, updateFields, resetFieldsIsDone } from './actions';
import useFormReducer from './use-form-reducer';

export const Context = createContext({});

export const Provider = ({ children, ...props }) => {
  return (
    <Context.Provider value={props}>
      {children}
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;

export const useForm = () => {
  const { formApi } = useContext(Context);
  return formApi;
};

const noop = () => (undefined);


const FormReducerRef = ({formReducerRef}) => {
  const formReducer = useFormReducer(useForm().name);
  formReducerRef.current = formReducer;
  return null;
};

export const Form = ({
  name,
  initialValues,
  onSubmit=noop,
  onSubmitSuccess=noop,
  children,
  render,
  ...props
}) => {

  const initFields = [];
  const fieldsRef = useRef(initFields);
  const initFieldArrays = [];
  const fieldArraysRef = useRef(initFieldArrays);
  const formReducerRef = useRef([]);
  const formRef = useRef();

  const isMountedRef = useRef(false);
  useEffect(() => {
    const dispatch = formReducerRef.current[1];
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      if (initialValues) {
        dispatch(updateFields(initialValues));
      }  
    } else if (formReducerRef.current[0].formStatus.isResetFieldsDue) {
      formReducerRef.current[1](resetFieldsIsDone());
    }
  });

  const formApiRef = useRef({
    deregisterField: (field) => {
      const index = fieldsRef.current.indexOf(field);
      if (index > -1) {
        fieldsRef.current.splice(index, 1);
      }
    },
    deregisterFieldArray: (fieldArray) => {
      const index = fieldArraysRef.current.indexOf(fieldArray);
      if (index > -1) {
        fieldArraysRef.current.splice(index, 1);
      }
    },
    name,
    registerField: (field) => {
      fieldsRef.current.push(field);
    },
    registerFieldArray: (fieldArray) => {
      fieldArraysRef.current.push(fieldArray);
    },
    updateFields: fieldValues => {formReducerRef.current[1](updateFields(fieldValues))},
    getField: fieldName => {
      for (const field of fieldsRef.current) {
        if (field.name === fieldName) {
          return field.getInterface();
        }
      }
    },
    formReducerRef
  });

  const markAllFieldsAsTouched = (touched= true) => {
    fieldsRef.current.forEach((field) => {
      field.setTouched(touched);
    });
  };

  const focusOnFieldWithError = () => {
    for (const field of fieldsRef.current) {
      const fieldApi = field.getInterface();
      if (fieldApi.error && fieldApi.element) {
        const element = fieldApi.element;
        if (element.focus) {
          element.focus();
        }
        if (element.scrollIntoView) {
          element.scrollIntoView();
        }
        break;
      }
    }
  };

  const handleSubmit = (event) => {
    markAllFieldsAsTouched();
    const [formState, dispatch] = formReducerRef.current;
    if (!formState.formStatus.isValid) {
      event.preventDefault();
      focusOnFieldWithError();
      return;
    }
    if (onSubmit === noop && formRef.current) {
      formRef.current.submit();
      return;
    }
    event.preventDefault();
    let submitResult;
    dispatch(startSubmit());
    try {
      submitResult = onSubmit(formState.fieldValues);
    } catch (submitError) {
      dispatch(stopSubmit(submitError.errors));
      if (submitError instanceof SubmissionError) {
        focusOnFieldWithError();
        return;
      }
      throw submitError;
    }

    if (!isPromise(submitResult)) {
      dispatch(stopSubmit());
      onSubmitSuccess(formApiRef.current);
      return;
    }
    return submitResult.then(
      () => {
        dispatch(stopSubmit());
        onSubmitSuccess(formApiRef.current);
        return;
      },
      (asyncError) => {
        dispatch(stopSubmit(asyncError.errors));
        if (asyncError instanceof SubmissionError) {
          focusOnFieldWithError();
          return;
        }
        throw asyncError;
      }
    );
  };

  const getContent = () => {
    if (render) {
      return render(props);
    }
    if (typeof children === 'function') {
      return children({handleSubmit});
    }
    return (
      <form {...props} onSubmit={handleSubmit} ref={formRef}>
        {children}
      </form>
    );
  }

  return (
    <Provider 
      formApi={formApiRef.current}
    >
      <FormReducerRef formReducerRef={formReducerRef}/>
      {getContent()}
    </Provider>
  );
};