import React, { Component } from 'react';
import './reset.css';
import './App.css'
import Sidebar from './components/sidebar/sidebar.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar></Sidebar>
      </div>
    );
  }
}

export default App;
