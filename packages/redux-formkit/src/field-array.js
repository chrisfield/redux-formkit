import React, { useEffect, useRef, memo } from 'react';
import { pushToFieldArray, removeFromFieldArray } from './actions';
import { useForm } from './form';
import useFieldArray from './use-field-array';

const FieldArrayComponent = (props) => {
  const fields = {
    map: (callback) => (
      (props.fields || []).map((item, index) =>
        callback(`${props.name}[${index}]`, index),
      )
    ),
    name: props.name,
    push: props.push,
    remove: props.remove,
  };

  const {component: Component, ...rest} = props;
  if (!Component) {
    return null
  }
  return <Component {...rest} fields={fields} />;
}

const FieldArray = ({name, ...props}) => {
  const connectionProps = useFieldArray(name);
  return (
    <FieldArrayBase
      name={name}
      {...props}
      {...connectionProps}
    />
  );
};

const FieldArrayBase = memo(({
  name,
  dispatch,
  fields,
  status, 
  formState,
  ...props
}) => {
  
  const fieldArrayApiRef = useRef({
    name
  });

  useEffect(() => {
    fieldArrayApiRef.current.fields = fields;
  });

  const formApi = useForm();
  useEffect(() => {
    formApi.registerFieldArray(fieldArrayApiRef.current);
    return () => {
      formApi.deregisterFieldArray(fieldArrayApiRef.current);
    }
  }, []);

  const push = () => {
    dispatch(pushToFieldArray()); 
  };

  const remove = (index) => {
    dispatch(removeFromFieldArray(index));
  }

  return (
    <FieldArrayComponent
      fields={fields}
      name={name}
      push={push}
      remove={remove}
      {...props}
    />
  );
},(prevProps, nextProps)=>(
  prevProps.fields === nextProps.fields
));

export default FieldArray;