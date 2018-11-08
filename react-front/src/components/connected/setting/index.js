import React, { Component } from 'react';
import axios from 'axios'
import './styles.css';
import {Button} from 'antd'

class Setting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			error: {}
		}
		this.getUser();
	}

	getUser() {
		axios.get('https://192.168.99.100:4242/user/me', 
		{'headers':{'Authorization':'Bearer '+ localStorage.getItem('token')}})
		.then((resp) => {
			this.setState({user:resp.data});
		})
		.catch((err) => {
			this.setState({error: err})
			console.log(err);
		})
	}
	loginDeezer(){
		axios.get('https://192.168.99.100:4242/user/login/deezer',
		{'headers':{'Authorization':'Bearer '+ localStorage.getItem('token')}})
		.then(resp => {
			console.log(resp);
		})
		.catch(err => {
			console.log(err);	
		})
	}
	// loginDeezer() {
	// 	
	// }
	render() {
	return (
		<div>
		<Button href="https://192.168.99.100:4242/user/login/deezer">Login Deezer</Button>
			<p> Login: {this.state.user.login}</p>
			<p> email: {this.state.user.email}</p>
			<p> Status: {this.state.user.status}</p>
		</div>
	);
  }
}

export default Setting;