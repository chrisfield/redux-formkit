# React Native Forms
Since Redux-formkit does not come with pre-defined web components it works really well with react-native.

Checkout the [with_react_native](https://github.com/chrisfield/redux-formkit/tree/master/examples/with_react_native) example.


#### Code from App.js
```
import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {FormStateProvider, Form, useFormReducer, useForm} from "redux-formkit";
import TextField from './components/form-controls/text-field';
import RadioButton from './components/form-controls/radio-button';

const TheFormState = () => {
  const [state] = useFormReducer(useForm().name);
  return (
    <Text>
      {JSON.stringify(state, null, 2)}
    </Text>
  );
};

export default  () => {
  return (
    <FormStateProvider>
      <Form name="myForm" onSubmit={submitValues} onSubmitSuccess={clearFormValues}>
        {({handleSubmit})=> (
          <View style={styles.container}>
            <TextField name="myField" label="A text field:"/>
            <View style={styles.radioGroup}>
              <RadioButton name="howMany" label="Option One" value="one"/>
              <RadioButton name="howMany" label="Option Two" value="two"/>
            </View>
            <TouchableHighlight onPress={handleSubmit} underlayColor={'gray'} style={styles.button}>
              <Text>Submit</Text>
            </TouchableHighlight>
            <TheFormState/>
          </View>
        )}
      </Form>
    </FormStateProvider>
  );
};

function submitValues(values) {
  alert(`You submitted:${JSON.stringify(values, null, 2)}`);
}

function clearFormValues(form) {
  form.updateFields({howMany: 'one'});
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  radioGroup: {
    margin: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    backgroundColor: '#cccccc',
    margin: 10,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1
  }
});
```