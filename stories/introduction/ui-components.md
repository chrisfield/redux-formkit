# User Interface Components

#### Approach to defining UI components
Typically form frameworks provide a set of built-in UI components (Checkbox, Select etc) and/or they include UI specific logic such as `if (type === "checkbox") {/* do checkbox stuff */}`. While this approach does make it easy for form developers to get started it also makes for a larger codebase. Also it can seem like the built-in components are special priviledged cases particularly if they make use of internal features or by-pass any api.

`redux formkit` uses an alternative approach: It provides just one UI component - `Field` together with an api that aims to make it easy enough for form developers to define the exact UI components they require. This approach keeps the framework lightweight. Also form developers use the same api that any example UI components will have used.


## Field

The `Field` component renders a UI component and connects it to the state.

You may have already seen a simple example of a `Field` being included directly in a Form in the 'Getting Started' section: `<Field name="firstName" component="input"/>`. Now you will see how `Field` can be used to define your own UI components.

The code snippet below defines a custom component that could be use like this `<TextInput name="firstName" label="First Name" required/>`:

<!-- STORY -->

```
import React from 'react';
import {Field} from 'redux-formkit';

const InputWrapper = ({label, name, touched, error, children}) => (
  <div>
    <label htmlFor={name}>{label || name}</label>
    {children}
    {touched && error && <p>{error}</p>}
  </div>
);

const TextInputComponent = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  elementRef,
  touched,
  error,
  children,
  ...props}) => 
(
    <InputWrapper {...{name, label, touched, error}}>
      <input
        id={name}
        ref={elementRef}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
    </InputWrapper>
);

const requiredStr = (value, _values, {label}) => {
  return value && value.trim && value.trim().length > 0 ? 
    undefined: `Please enter a value for ${label.toLowerCase()}`
};

export const TextInput = ({required, ...props}) => {
  return <Field
    component={TextInputComponent}
    validate={required? requiredStr: undefined}
    {...props}
  />
}
```
---
#### Explanation
`TextInput` renders a `Field`. If it is a required `TextInput` the `Field` will be given `requiredStr` as the `validate` prop.

`requiredStr` `Field` will call validate functions when onChange events or onSubmit events fire. Validate functions are called with three params:
- `value: any`: the latest field value
- `values: object`: all the fieldValues. Use this to validate one field against another
- `fieldInterface: object`: Use this to get additional context about the `Field`. In this example the `label` is used in the form error message.

`TextInputComponent` is the component the `Field` will render. It renders a standard html input inside an `InputWrapper`.

`input` is a standard html component. You can see how a value is provided from state and how onChange and onBlur will call the functions that update state. If `ref=elementRef` is passed on then `redux-formkit` can put the cursor focus on the first field with an error during submit validation.

`InputWrappper` renders its children (the input) with a label and an error message. Note that the errorMessage will only render if the `Field` is `touched`.

---

#### Summary
Much of the code snippet involves displaying the label and error message. The `InputWrapper` could be reused to add labels and errorMessages to other comnponents.

---

## Field Api
Field will make use of the following props (other props will be passed straight through to the rendered component):
* `name : required string` — the name of the field eg 'postcode'

* `component : required string or function` — the component to render. Eg like `component="input"` will render an input html element and component={Input} will call Input to render the component defined above. 

* `validate : optional function or array of functions` — Any validation functions will be called two parameters: First the formatted field value (eg will be numeric for number formatted fields); Second all the field-values (eg so it's easy to check one date is after another). Validation functions should return undefined if the validation passes or an error if the validation fails. The error will often be a string but it can be any object.

* `formatToStore : optional function` — use this to convert the event.target.value to whatever semantic value makes sense to store in redux. Eg `format={str => str.toUpperCase}` will store the number as uppercase. 

* `formatFromStore : optional function` — use this to convert the value in redux to the value is expected by the rendered component. Eg: `formatFromStore={addCommas}` where `addcommas` is:
```
const addCommas = number => {
  if (number === 0) {
    return '0';
  }
  if (!number) {
    return '';
  }
  return number.toLocaleString();
};

``` 

* `beforeUpdate : optional function` — provide a function that will return a custom value (any type) that you can then access after the field renders. The function will be passed the `fieldInterface`, value, nextValue as parameters. The value that your function returns will later be passed on to any afterUpdate function. A typical use for this function is to calculate and return the cursor-position before a field is formatted.

* `afterUpdate : optional function` — provide a function that will called after the field renders. Your function will be passed the `fieldInterface` and as a parameter. Typical uses for this function would be: to use a custom value eg to set the cursor-position or secondly to revalidate a second field when one field changes.

* `getTargetValue : optional function` — provide a function to get the value. It will be called with the target and event as a parameters.

* `useTargetCondition : optional function` — Only relevant for isomorphic forms. Will be called onComponentMount with the elementRef as a parameter.  If it returns true the value of the element will be used to update the store. See it used on the radio-buttons in the next-js example.

<a name="fieldInterface"></a>
The `fieldInterface` object (passed to beforeUpdate and afterUpdate) includes props: 
* `name` of this field
* `element` defined if you pass `ref={elementRef}` to the html element
* `value`
* `error`
* `touched`
* `customProps`
* `validate: function` no params taken
* `setTouched:` pass a boolean value
* `setValue`: pass the value

Field will pass these props to the rendered component:
* `handleChange` function to call onChange
* `handleBlur` function to call onBlur
* `value` value formatted from the store
* `error` string or object. Will be undefined for a valid field 
* `touched` boolen
* `elementRef` pass this an the ref prop
