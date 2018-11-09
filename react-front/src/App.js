import React, { Component } from 'react';
import './reset.css';
import './App.css'
import Connection from './components/connection'
import Connected from './components/connected'
import "antd/dist/antd.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentComponent: localStorage.getItem('token') && localStorage.getItem('token').length > 0 ? 'event' : 'login',
      token: localStorage.getItem('token'),
      'data': [],
      'id': null,
      'currentUser': null
		}
	}

  updateState = (val) => {
    console.log('val =>');
    console.log(val);
    console.log('old state =>');
    console.log(this.state);
    this.setState(val);
  }
  componentDidUpdate= () => {
    console.log(this.state);
  }

  render() {
    const token = localStorage.getItem('token')
    return (
      <div className="App">
      <div id="dz-root"></div>
      {token ? (
        <Connected updateParent={this.updateState} state={this.state}/>

      ) : (
        <Connection updateParent={this.updateState} state={this.state}/>
      )}
      </div>
      
    );
  }
}

export default App;
