# Example UI Components

## TextField

Enter values in the field on the left and see the changes to the state shown on the right. Then have a look at the code snippet read the  explanation.

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
      {props.error && props.touched && <div>{props.error}</div>}     
    </div>
  );
  
  const TextField = ({validate = [], ...props}) => {
    const validation = Array.isArray(validate) ? validate.slice() : [validate];
    if (props.required) {
      validation.unshift(requiredStr);
    }
    return <Field component={Input} validate={validation} {...props} />;
  };

  export default TextField;
```

---

### Explanation of TextField example

```TextField``` renders a ```Redux-formkit Field```. The whole point of ```Field``` is that it will:
- render whatever ```component``` it is given as a prop
- pass on props it receives (except for ```component```)
- add extra props including ```handleChange```, ```handleBlur```, ```setElementRef```, ```touched``` and ```error```

You can see that the ```Input``` component renders a labelled ``` html input``` in a div and it will render ```error``` only if ```props.error && props.touched``` evaluates to true.

Props like placeholder are not known to ```redux-formkit``` but they work because props (except for ```component```) are passed straight through to the rendered component (```Input``` in this case).

This particular example has been written so it is easy to pass a ```required``` prop for required inputs. Required ```TextField's``` will add ```requiredStr``` to the start of the validation array.

As it happens I haven't set the ```required``` prop on the ```html input``` but since the UI components are examples rather that part of the library you can easily adapt and make changes to create the components that fit your needs.
<br/>