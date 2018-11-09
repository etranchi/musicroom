import React, { Component } from 'react';
import './reset.css';
import './App.css'
import Connection from './components/connection'
import Connected from './components/connected'
import "antd/dist/antd.css";
import axios from 'axios'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentComponent: localStorage.getItem('token') && localStorage.getItem('token').length > 0 ? 'event' : 'login',
      token: localStorage.getItem('token'),
      'data': [],
      'id': null,
      'user': null
		}
	}

  updateState = (val) => {
    console.log(val);
    console.log("old state ->");
    console.log(this.state);
    this.setState(val);
  }
  componentDidUpdate= () => {
    console.log(this.state);
  }

  componentDidMount() {
    var script = document.createElement('script');
    script.src = "https://e-cdns-files.dzcdn.net/js/min/dz.js";
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token)
    {
      axios.get('https://192.168.99.100:4242/user/me', 
      {'headers':{'Authorization':'Bearer '+ localStorage.getItem('token')}})
      .then((resp) => {
        this.setState({user:resp.data, token:localStorage.getItem('token')});
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
    })
    }
  }

  render() {
    const token = localStorage.getItem('token')
    console.log(this.state);
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
