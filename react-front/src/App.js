import React, { Component } from 'react';
import './reset.css';
import './App.css'
import Sidebar from './components/sidebar/sidebar'
import Titi from './components/titi/titi'
import Login from './components/login'
import Register from './components/register'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 'login',
      token: localStorage.getItem('token')
		}
	}

	onUpdate = (val) => {
	    this.setState({
	      current: val
	    })
	  };

  updateToken = (val) => {
      this.setState({
        token: val
      })
      localStorage.setItem('token', this.state.token);
    };
  render() {
  	// const current = this.state.current;
    const token = this.state.token
    console.log(token);
    console.log(this.state.current);
    var c;
    if (this.state.current === 'login')
      c = <Login updateToken={this.updateToken}/>
    if (this.state.current === 'register')
      c = <Register updateToken={this.updateToken}/>

    return (
      <div className="App">
      {token ? (
        <Titi/>
      ) : (
        [<Sidebar onUpdate={this.onUpdate}></Sidebar>, c]
      )}
      </div>
    );
  }
}

export default App;
