import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Field} from 'redux-formkit';

const Input = props => (
  <View>
    <Text>text input: </Text>
    <TextInput
      ref={props.setElementRef}
      id={props.name} 
      type={props.type? props.type: 'text'} 
      placeholder={props.placeholder} 
      value={props.value} 
      onChangeText={props.handleChange} 
      onBlur={props.handleBlur}
      style={styles.textInput}
    />
    <Text>End</Text>
  </View>
);

const getTargetValue = (target, value) => (
  value 
)

const useTargetCondition = () => false;
  
const InputField = props => (
  <Field useTargetCondition={useTargetCondition} getTargetValue={getTargetValue} component={Input} {...props} />
);

const styles = StyleSheet.create({
  textInput: {
    color: 'green',
    borderColor: 'gray',
    borderWidth: 1
  },
});

export default InputField;