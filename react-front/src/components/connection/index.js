import React, { Component } from 'react';
import './styles.css';
import Login from './login'
import Register from './register'

class Connection extends Component {
  render() {
    return (
      <div>
      <ul>
      	<li
			onClick={this.props.updateParent.bind(this, {'currentComponent':'register'})}>
			register
		</li>
		<li
			onClick={this.props.updateParent.bind(this, {'currentComponent':'login'})}>
			login
		</li>
		</ul>
      	{this.props.state.currentComponent === 'login'? <Login updateParent={this.props.updateParent}/> : <Register updateParent={this.props.updateParent}/>}
        
      </div>
    );
  }
}

export default Connection;
