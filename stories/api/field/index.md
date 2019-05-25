# Field

The Field component renders a UI component and connects it to the state.

You can see an example of a Field being included directly in a Form in the 'Getting Started' section: <Field name="firstName" component="input"/>. 

You can see how it can be used to define ui-components in the 'Example ui-components section'.

`Field` uses onChange, onBlur functions to maintain the value in state. It also renders a component passing in the value from state.

| Property Name      | Required | Description                                                                                                                                                                                                                                                                                                                                                                                           |
|--------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name               | Yes      | String. A unique name for the Field                                                                                                                                                                                                                                                                                                                                                                   |
| component          | Yes      | String or Function for the component to render. Eg `component="input"` will render an input html element and component={Input} will call Input to render the component.                                                                                                                                                                                                                               |
| validate           |          | Function or array of functions. Validation functions will be called with three parameters: First the stored field value; Second all the field-values (for validating one field against another); Third a `fieldInterface` object. Validation functions should return undefined if the validation passes or an error if the validation fails. The error will often be a string but it can be any object. |
| formatToStore      |          | Function to convert the event.target.value to whatever semantic value makes sense to store.  Eg `format={str => str.toUpperCase}` will store the number as uppercase.                                                                                                                                                                                                                                 |
| formatFromStore    |          | Function to format the value in the store to the value as rendered by the component. Eg: `formatFromStore={addCommas}`                                                                                                                                                                                                                                                                                |
| beforeUpdate       |          | Function that will return a custom value (any type) that you can then access after the field renders. The function will be passed the `fieldInterface`, value, nextValue as parameters. The value that your function returns will later be passed on to any afterUpdate function. A typical use for this function is to calculate and return the cursor-position before a field is formatted.         |
| afterUpdate        |          | Function that will called after the field renders. Your function will be passed the `fieldInterface` and as a parameter. Typical uses for this function would be: to use a custom value eg to set the cursor-position or secondly to revalidate a second field when one field changes.                                                                                                                |
| getTargetValue     |          | Function to get the value. It will be called with the target and event as a parameters.                                                                                                                                                                                                                                                                                                               |
| useTargetCondition |          | Function (only relevant for isomorphic forms). Will be called onComponentMount with the elementRef as a parameter.  If it returns true the value of the element will be used to update the store. See it used on the radio-buttons in the next-js example.                                                                                                                                              |

The `fieldInterface` object (passed to beforeUpdate, afterUpdate and validate functions) includes any extra props passed to `Field` plus these standard props: 
* `name` of this field
* `element` defined if you pass `ref={elementRef}` to the html element
* `value`
* `error`
* `touched`
* `validate: function` no params taken
* `setTouched:` pass a boolean value
* `setValue`: pass the value

`Field` will pass these props to the rendered component:
* `handleChange` function to call onChange
* `handleBlur` function to call onBlur
* `value` value formatted from the store
* `error` string or object. Will be undefined for a valid field 
* `touched` boolen
* `elementRef` pass this an the ref prop

---
