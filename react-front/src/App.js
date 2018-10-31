import React, { Component } from 'react';
import './reset.css';
import './App.css'
import Connection from './components/connection'
import Connected from './components/connected'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentComponent: 'login',
      token: localStorage.getItem('token')
		}
	}

  updateState = (val) => {
    console.log('old state');
    console.log(this.state);
    this.setState(val);
    console.log('new state');
    console.log(this.state);
  };

  render() {
  	// const current = this.state.current;
    const token = localStorage.getItem('token')
    console.log('token ->');
    console.log(token);
    return (
      <div className="App">
      {token ? (
        <Connected updateParent={this.updateState} currentComponent={this.state.currentComponent}/>
      ) : (
        <Connection updateParent={this.updateState} currentComponent={this.state.currentComponent}/>
      )}
      </div>
    );
  }
}

export default App;
