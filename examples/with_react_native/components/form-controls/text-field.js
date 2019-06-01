import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {Field} from 'redux-formkit';

const Input = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  elementRef,
  touched,
  error,
  children,
  ...props}) => (
  <View>
    <Text>{label}</Text>
    <TextInput
      ref={elementRef}
      id={name} 
      value={value} 
      onChangeText={handleChange} 
      onBlur={handleBlur}
      style={styles.textInput}
    />
  </View>
);

const useTargetCondition = () => false;
  
const TextField = props => (
  <Field useTargetCondition={useTargetCondition} component={Input} {...props} />
);

const styles = StyleSheet.create({
  textInput: {
    color: 'green',
    borderColor: 'gray',
    borderWidth: 1
  },
});

export default TextField;