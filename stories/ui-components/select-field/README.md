# Example UI Components

## SelectField

The form below has a multi select of nice colors and a single select of a favorate color. I've written it so the favorate color must be one of the colors selected as being nice. First lets look at ```SelectField``` as example of how to implement a ```select``` component then take a look at the code for the form.

<!-- STORY -->

```jsx
import React from 'react';
import {Field} from '../../packages/redux-formkit';

const getTargetValue = target => {
  const options = Array.from(target.options);
  return options.filter(option=>(option.selected)).map(option=>(option.value));
}

const Select = props => (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <select
        multiple={props.multiple}
        ref={props.setElementRef}
        id={props.name} 
        type={props.type? props.type: 'text'} 
        value={props.value}
        onChange={props.handleChange} 
        onBlur={props.handleBlur}
      >
        {props.children}
      </select>
      {props.error && props.touched && <div>{props.error}</div>}     
    </div>
  );
  
  const SelectField = props => {
    return <Field getTargetValue={props.multiple ? getTargetValue : undefined} component={Select} {...props} />;
  };

  export default SelectField;
```

---

### Explanation of SelectField example

There are similarites between the implementation of ```SelectField``` and ```TextField```. They both render a ```redux-formkit Field``` and use the extra props like ```handleChange```, ```handleBlur```, ```setElementRef```, ```touched``` and ```error```.

You can see that the ```Select``` component renders a labelled ``` html select``` in a div and, like ```TextField```, it will render ```error``` only if the field has a status of ```touched```.

Selects with the ```multiple``` prop set an array of the selected values. When ```multiple``` is passed as a prop the getTargetValue function will be used by ```redux-formkit Field``` to get the selected value array. When ```multiple``` is not passed the ```redux-formkit Field``` will default to getting the value from the ```event.target.value```

---

### The Form
```jsx
import React from 'react';
import formkit, {connectWithoutRedux as connect} from 'redux-formkit';
import {SelectField} from '../../form-controls';

const ExampleForm = (props) => (
  <form>
    <div>
      <div>

      <SelectField
          multiple
          name="niceColors"
          label="Nice Colors"
          afterUpdate={handleNiceColorsChange}
        >
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </SelectField>
        <SelectField
          name="favorateColor"
          label="Favorate Color"
          validate={validateFavorateColor}
        >
          <option key={""} value="">Select...</option>
          { props.form.getFormState().fieldValues.niceColors &&
            props.form.getFormState().fieldValues.niceColors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </SelectField>
        <button onClick={props.form.handleSubmit}>
          Send
        </button>
      </div>
      <div>
        <p>Error Count: {props.form.getFormState().formStatus.errorCount}</p>
        <p>niceColors: {JSON.stringify(props.form.getFormState().fieldValues.niceColors)}</p>
        <p>fieldStatus.niceColours: {JSON.stringify(props.form.getFormState().fieldStatus.niceColors)}</p>
        <p>favorateColor: {props.form.getFormState().fieldValues.favorateColor}</p>
        <p>fieldStatus.favorateColour: {JSON.stringify(props.form.getFormState().fieldStatus.favorateColor)}</p>
      </div>
    </div>
  </form>  
);

const validateFavorateColor = (value, values) => {
  if (!value
    || values.niceColors.filter(niceColor => (niceColor === value)).length === 0) 
  {
    return 'Please select a color';
  }
}

const handleNiceColorsChange = field => {
  field.form.getField('favorateColor').validate()
}

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearFormValues(form) {
  form.updateFields({niceColors:[]});
}

const FormkitForm = formkit({
  connect,
  name: 'exampleF',
  initialValues: {niceColors:[]},
  onSubmit: submitValues,
  onSubmitSuccess: clearFormValues
})(ExampleForm);

export default FormkitForm;
```

### Explanation of SelectField example
There's just a couple of things to mention. Firstly favorateColor includes validation that checks the favorateColor is one of the niceColors.

Secondly, niceColors uses the afterUpdate prop to call a function that revalidates favorateColor.

This validation and revalidation prevents the user from submitting after selecting a valid favorateColor and the changing the niceColors to exclude the favorateColor.
<br/>