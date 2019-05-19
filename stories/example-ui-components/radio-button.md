# Example User Interface Components


## Example RadioButton

The code snippet below defines a ui-component component that could be use like this:
```
<div>
  <RadioButton name="rb2" label="Red" value="R" />
  <RadioButton name="rb2" label="Green" value="G" />
  <RadioButton name="rb2" label="Blue" value="B" />
</div>
```
<!-- STORY -->

#### Code
```
import React from 'react';
import {Field} from 'redux-formkit;

const isChecked = target => target.checked;
  
const RadioButtonComponent = props => {
  const id = `${props.name}-${props.radioValue}`;
  return (
    <div>
      <input id={id} type="radio" ref={props.setElementRef} name={props.name} value={props.radioValue} checked={props.radioValue===props.value} onChange={props.handleChange}/>
      <label htmlFor={id}>{props.label}</label>
    </div>
  );
};

const RadioButton = props => (
  <Field
    component={RadioButtonComponent}
    name={props.name}
    radioValue={props.value}
    useTargetCondition={isChecked}
    label={props.label}
  />
);

export default RadioButton;
```
---
#### Explanation
`RadioButton` renders a `Field`. The `value` is passed on as `radioValue`. 

`RadioButtonComponent` is the component the `Field` will render. It renders a standard html input with type="radio" and a label. The radio button will be checked if the `radioValue` equals the value stored in the state.

`useTargetCondition={isChecked}` is necessary on radio buttons because of the way reduxFormkit implements support for isomorphic forms. For more information on this please see the [with-next-and-redux example](https://github.com/chrisfield/redux-formkit/tree/master/examples/with-next-and-redux). 