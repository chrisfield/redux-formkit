import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import formkit from 'redux-formkit';
import { connect } from 'react-redux';
import InputField from './form-controls/input-field';
import RadionButton from './form-controls/radion-button';

const ExampleForm = (props) => (
  <View>
    <Text>This is the example form</Text>
    <InputField name="myField" label="An input field:"/>
    <View style={styles.radioGroup}
      >
      <RadionButton name="howMany" label="Option One" value="one"/>
      <RadionButton name="howMany" label="Option Two" value="two"/>
    </View>
    <TouchableHighlight onPress={props.form.handleSubmit} underlayColor={'gray'} style={styles.button}>
        <Text>Submit</Text>
    </TouchableHighlight>

    <Text>Form state : {JSON.stringify(props.form.getFormState(), undefined, 2)}</Text>
  </View>
)

const boxStyle = {
  margin: 10,
  padding: 10,
  borderColor: 'gray',
  borderWidth: 1
};

function submitValues(values) {
  alert(`You submitted:${JSON.stringify(values, null, 2)}`);
}

function clearFormValues(form) {
  form.updateFields({howMany: 'one'});
}

export default formkit({
  connect,
  name: 'exampleF',
  initialValues: {myField: 'Hi There', howMany: 'two'},
  onSubmit: submitValues,
  onSubmitSuccess: clearFormValues
})(ExampleForm);

const styles = StyleSheet.create({
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
