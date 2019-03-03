import React, { useEffect, useRef, memo } from 'react';
import { pushToFieldArray, removeFromFieldArray } from './actions';
import { useForm } from './form';
import useFieldArray from './use-field-array';

const FieldArrayComponent = (props: any): any => {
  const fields = {
    map: (callback: any) => (
      (props.fields || []).map((item: any, index: number) =>
        callback(`${props.name}[${index}]`, index),
      )
    ),
    name: props.name,
    push: props.push,
    remove: props.remove,
  };

  const {component: Component, ...rest} = props;
  return <Component {...rest} fields={fields} />;
}

const FieldArray = ({name, ...props}: any) => {
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
}: any) => {

  console.log(`render FieldArray, ${name}`);
  
  const fieldArrayApiRef: any = useRef({
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
    console.log('dispatch push', name)
    dispatch(pushToFieldArray()); 
  };

  const remove = (index: number) => {
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