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
		this.save = {...this.state};
		this.updateLogin = this.updateLogin.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.updateSave = this.updateSave.bind(this);
	}

	updateLogin(e) {
		this.setState({login: e.target.value})
	}

	updatePassword(e) {
		this.setState({password: e.target.value})
		
	}

	updateSave(){
		if (this.save.login !== this.state.login || this.save.password !== this.state.password)
		{
			if (this.state.password)
			{
				axios.put('https://192.168.99.100:4242/user/me', 
					{login:this.state.login, password:this.state.password},
					{'headers' : {'Authorization': 'Bearer '+ localStorage.getItem('token')}}
					)
				.then(resp => {
					this.props.updateParent({currentComponent: 'setting', user:resp.data});
					console.log(resp);
				})
				.catch(err => {
					console.log(err);
				})
			}
			else
			{

				axios.put('https://192.168.99.100:4242/user/me', 
					{login:this.state.login},
					{'headers' : {'Authorization': 'Bearer '+ localStorage.getItem('token')}}
					)
				.then(resp => {
					this.props.updateParent({currentComponent: 'setting',user:resp.data});
					console.log(resp);
				})
				.catch(err => {
					console.log(err);
				})
			}
		}
	}

	render() {
		console.log(this.state);
		console.log(this.save);
	return (
		<div>
		<Button onClick={this.props.updateParent.bind(this,{'currentComponent': 'setting'})}>Back</Button>
		<div>
		<Input placeholder="Enter your login" style={{ width: 200 }} value={this.state.login} onChange={this.updateLogin}/>
		</div>
		<div>
		<Input type="password" placeholder="Enter your password" style={{ width: 200 }} value={this.state.password} onChange={this.updatePassword}/>
		</div>
		<Button onClick={this.updateSave}>Save</Button>
		</div>
	);
  }
}

export default EditSetting;

