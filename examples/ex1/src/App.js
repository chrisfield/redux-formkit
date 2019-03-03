import React from 'react';
import { 
  Form,
  Field,
  FieldArray,
  useForm,
  useField,
  useFormReducer
} from './redux-formkit';

const Input = ({name, value, handleChange, handleBlur, elementRef, children=null, touched, error}) => {
  console.log(`render Input, ${name}`);
  
  return (
    <div>
      <div>
        <input 
          ref={elementRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {children}
        field: {name}
        with value: {JSON.stringify(value)}
        {touched && error && <p>{error}</p>}
      </div>
    </div>
  );
};

export const requiredStr = value => {
  return value && value.trim && value.trim().length > 0 ? undefined: 'required'
};

export const number = str => {
  const num = parseInt(str.replace(/[^\d.-]/g, ""), 10);
  if (num === null) {
    return undefined;
  }
  return num;
};

export const addCommas = number => {
  if (number === 0) {
    return '0';
  }
  if (!number) {
    return '';
  }
  return number.toLocaleString();
};

export const getNextCursorPosition = field => ({cursorPosition: field.elementRef.selectionStart});

export const getNextCursorPositionNum = ({ elementRef }, value, nextValue) => {
  console.log(`getNextCursorPositionNum`, elementRef.current, `val${value}.`, `nxtval ${nextValue}`);
  let cursorPosition = elementRef.current.selectionStart;
  if (nextValue.length === value.length + 2) { // + 2 is for digit and comma
    cursorPosition++;
  }
  return {cursorPosition};
}

export const setCursorPosition = ({customProps: {cursorPosition}, elementRef}) => {
  if (cursorPosition !== undefined && elementRef.current.setSelectionRange) {
    elementRef.current.setSelectionRange(cursorPosition, cursorPosition);
  }  
}

const NumberField = (props) => {
  return <Field 
    component={Input}
    formatFromStore={addCommas}
    formatToStore={number}
    beforeUpdate={getNextCursorPositionNum}
    afterUpdate={setCursorPosition}
    {...props}
  />
}

const FieldThree = () => {
  const f2 = useField('fieldTwo').value;
  if (f2) {
    return <Field component={Input} name="fieldThree" validate={requiredStr}/>
  }
  return null;
}

const ComponentUsingFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

const submitValues = (values) => {
  console.log(`You submitted`, values);
};

const App = () => {  
  return (
    <Form name="myForm" onSubmit={submitValues}>
      <div>
        <Field component={Input} name="fieldOne" validate={requiredStr}/>
        <Field component={Input} name="fieldTwo"/>
        <FieldThree/>
        <NumberField name="age"/>
        <Field component="input" name="fieldFour" placeholder="Field four"/>
      </div>
      <FieldArray
        name="hobbies"
        component={RenderHobbies}
      />
      <button>Submit</button>
      Here:<ComponentUsingFormState />End
        formState is:  {/*JSON.stringify(useFormReducer('myForm')[0]) + '.'*/}
    </Form>
  );
};

const RenderHobbies = ({fields}) => (
  <fieldset>
    <legend className="example-form_title">
      Hobbies
    </legend>
    {fields.map((hobby, index) => (
      <div key={hobby}>
        <Field
          component={Input}
          key={hobby}
          name={`${hobby}.description`}
          validate={requiredStr}
          label={`Hobby #${index + 1}`}
        >
          <button type="button" title="Remove Hobby" onClick={() => fields.remove(index)}>-</button>
        </Field>
      </div>
    ))}
    <button type="button" onClick={() => fields.push()}>Add Hobby</button>
  </fieldset>
);

export default App;
