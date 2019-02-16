# Overview

## User Interface Components

---

#### TextInput
Remember that `redux-formkit` does not itself include any UI components but basic UI components are easy to write. The git repo does include several example UI components. Lets look at one of these: `TextField`; 

<!-- STORY -->

```jsx
import React from 'react';
import {Field} from '../../packages/redux-formkit';
import {requiredStr} from './utils';


const Input = props => (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
         ref={props.setElementRef}
         id={props.name} 
         type={props.type? props.type: 'text'} 
         placeholder={props.placeholder} 
         value={props.value} 
         onChange={props.handleChange} 
         onBlur={props.handleBlur}
      />
      {props.children}
      {props.error && props.touched && <div>{props.error}</div>}     
    </div>
  );
  
  const InputField = ({validate, ...props}) => {
    const validation = props.required ? [requiredStr] : [];
    if (validate) {
      validation.push(validate);
    }
    return <Field component={Input} validate={validation} {...props} />;
  };

  export default InputField;
```

---

### Explanation


<br/>