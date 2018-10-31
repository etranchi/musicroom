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
    this.setState(val);
    if (!val.token)
      localStorage.setItem('token', '');
  };

  render() {
  	// const current = this.state.current;
    const token = this.state.token

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
