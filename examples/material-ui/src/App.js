import React, { Component } from 'react';
import './App.css';
import ExampleForm from './components/ExampleForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Example Form using redux-formkit</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/components/ExampleForm.js</code> and save to reload.
        </p>
        <ExampleForm/>
      </div>
    );
  }
}

export default App;
