import React, { createContext, useContext, useRef } from 'react';
import isPromise from "is-promise";
import SubmissionError from "./submission-error";
import { startSubmit, stopSubmit, updateFields } from './actions';
import useFormReducer from './form-reducer';

export const Context = createContext({});

export const Provider = ({ children, ...props }:any) => {
  return (
    <Context.Provider value={props}>
      {children}
    </Context.Provider>
  );
};

export const Consumer = Context.Consumer;

export const useForm = () => {
  const { formApi }: any = useContext(Context);
  return formApi;
};

const noop = () => (undefined);


const FormReducerRef = ({formReducerRef}: any) => {
  const formReducer = useFormReducer(useForm().name);
  formReducerRef.current = formReducer;
  return null;
};

export const Form = ({name, onSubmit=noop, onSubmitSuccess=noop, children}: any) => {

  const initFields: any = [];
  const fieldsRef = useRef(initFields);
  const initFieldArrays: any = [];
  const fieldArraysRef = useRef(initFieldArrays);
  const formReducerRef: any = useRef();

  const formApiRef = useRef({
    deregisterField: (field: any) => {
      const index = fieldsRef.current.indexOf(field);
      if (index > -1) {
        fieldsRef.current.splice(index, 1);
      }
    },
    deregisterFieldArray: (fieldArray: any) => {
      const index = fieldArraysRef.current.indexOf(fieldArray);
      if (index > -1) {
        fieldArraysRef.current.splice(index, 1);
      }
    },
    name,
    registerField: (field: any) => {
      fieldsRef.current.push(field);
    },
    registerFieldArray: (fieldArray: any) => {
      fieldArraysRef.current.push(fieldArray);
    },
    updateFields: (fieldValues: any) => formReducerRef.current[1](updateFields(fieldValues)),
    getState: () => (formReducerRef.current[0]),
    getField: (name: any) => (fieldsRef.current.find((field: any) => field.name === name))
  });

  const markAllFieldsAsTouched = (touched= true) => {
    fieldsRef.current.forEach((field: any) => {
      field.setTouched(touched);
    });
  };

  const focusOnFieldWithError = () => {
    for (const field of fieldsRef.current) {
      if (field.error) {
        const element = field.elementRef.current;
        if (element && element.focus) {
          element.focus();
        }
        if (element && element.scrollIntoView) {
          element.scrollIntoView();
        }
        break;
      }
    }
  };

  const handleSubmit = (event: any) => {
    markAllFieldsAsTouched();
    const [formState, dispatch] = formReducerRef.current;
    if (!formState.formStatus.isValid) {
      event.preventDefault();
      focusOnFieldWithError();
      return;
    }
    if (!onSubmit) {
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
      (asyncError: any) => {
        dispatch(stopSubmit(asyncError.errors));
        if (asyncError instanceof SubmissionError) {
          focusOnFieldWithError;
          return;
        }
        throw asyncError;
      }
    );
  };

  return (
    <Provider 
      formApi={formApiRef.current}
    >
      <FormReducerRef formReducerRef={formReducerRef}/>
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </Provider>
  );
};