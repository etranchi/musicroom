import React, { Component } from 'react';
import './styles.css';
import Login from './login'
import Register from './register'
import {Button} from 'antd'

class Connection extends Component {
  render() {
    return (
      <div>
      	<div style={{'textAlign':'center', 'margin': '1em'}}>	
      	{this.props.state.currentComponent === 'register'? <Button type="primary" onClick={this.props.updateParent.bind(this, {'currentComponent':'login'})}>Login</Button> : null}
      	{this.props.state.currentComponent === 'login'? <Button type="primary" onClick={this.props.updateParent.bind(this, {'currentComponent':'register'})}>Register</Button> : null}
      	</div>
       	{this.props.state.currentComponent === 'register'? <Register updateParent={this.props.updateParent}/> : null}
       	{this.props.state.currentComponent === 'login'? <Login updateParent={this.props.updateParent}/> : null}
      </div>
    );
  }
}

export default Connection;
