import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import inputField from './form-controls/input-field'
import formkit, {Field} from 'redux-formkit';
import { connect } from 'react-redux';
import InputField from './form-controls/input-field';

const ExampleForm = (props) => (
  <View>
    <Text>This is the example form....</Text>
    <Text>text input: </Text><TextInput value="abc" style={styles.textInput}/><Text>End</Text>
    <InputField name="myField"/>
  </View>
)

function submitValues(values) {
  window.alert(`You submitted:${JSON.stringify(values, null, 2)}`)
}

function clearFormValues(form) {
  form.updateFields({});
}

export default formkit({
  connect,
  name: 'exampleF',
  initialValues: {myField: 'Hi There'},
  onSubmit: submitValues,
  onSubmitSuccess: clearFormValues
})(ExampleForm);

const styles = StyleSheet.create({
  textInput: {
    color: 'green',
    borderColor: 'gray',
    borderWidth: 1
  },
});
