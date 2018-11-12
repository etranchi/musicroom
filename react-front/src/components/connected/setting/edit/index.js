import React, { Component } from 'react';
import axios from 'axios';
import {Button, Input} from 'antd';


class EditSetting extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			login: props.state.user.login,
			password: null
		}
		this.updateLogin = this.updateLogin.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
	}

	updateLogin(e) {
		this.setState({login: e.target.value})
	}

	updatePassword(e) {
		this.setState({password: e.target.value})
		
	}

	render() {
		console.log(this.state); 
	return (
		<div>
		<Button onClick={this.props.updateParent.bind(this,{'currentComponent': 'setting'})}>Back</Button>
		<div>
		<Input placeholder="Enter your login" style={{ width: 200 }} value={this.state.login} onChange={this.updateLogin}/>
		</div>
		<div>
		<Input placeholder="Enter your password" style={{ width: 200 }} value={this.state.password} onChange={this.updatePassword}/>
		</div>
		</div>
	);
  }
}

export default EditSetting;

