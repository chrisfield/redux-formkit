import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import { StyleSheet, Text, View } from 'react-native';
import ExampleForm from './components/ExampleForm';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
          <ExampleForm/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
