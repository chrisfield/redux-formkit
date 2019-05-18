# Example User Interface Components


## Example Checkbox

The code snippet below defines a ui-component component that could be use like this `<Checkbox name="isAgreed" label="Do you agree?"/>`.

<!-- STORY -->

```
import React from 'react';
import {Field} from 'redux-formkit';

const isChecked = target => target.checked;

const CheckboxComponent = props => (
  <div>
    <label htmlFor={props.name}>{props.label}</label>
    <input id={props.name} ref={props.elementRef} type="checkbox" checked={props.value} onChange={props.handleChange}/>  
  </div>
);

const Checkbox = props => (
  <Field component={CheckboxComponent} getTargetValue={isChecked} {...props} />
);

export default Checkbox;
```
---
#### Explanation
`Checkbox` renders a `Field`. The `getTargetValue={isChecked}` prop trlls `reduxFormkit` to set the state from this component according to the `checked` attribute of the input.

`CheckboxComponent` is the component the `Field` will render. It renders a standard html input with type="checkbox" and a label.
