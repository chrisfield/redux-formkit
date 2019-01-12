import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Field} from 'redux-formkit';

function RadioButton(props) {
  const id = `${props.name}-${props.radioValue}`;
  return (
    <TouchableOpacity
      onPress={() => { props.handleChange(props.radioValue) }}
    >
      <View style={styles.radioButton}
      >
        <Text style={{paddingRight: 5}}>{props.label}</Text>
        <View style={[styles.circle, props.style]}>
          {
            props.radioValue===props.value ?
              <View style={styles.dot}/>
              : null
          }
        </View>
      </View>
    </TouchableOpacity>
  );
}

const RadioField = props => (
  <Field radioValue={props.value} component={RadioButton} {...props} />
);

const styles = StyleSheet.create({
  radioButton: {
    flexDirection:"row",
    padding: 5
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  }
});

export default RadioField;